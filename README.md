본 프로젝트는 Account abstraction을 활용해 소셜 리커버리 및 guardians를 활용한 지갑 복구 기능을 구현할 예정이다.

해당 기능에 코드에 대해 본적 없기도 하고 앞으로 분명 지갑 서비스에서 주요하게 쓰일거 같다는 생각에 본 프로젝트를 진행한다.

우선 해당 기능에 대해서만 간단히 구현하고 추가 기능들은 추후에 구현할 예정이다.

# Social Recovery

AA에서는 스마트 컨트랙트 계정에 지갑을 복구 하는 계정을 구현할 수 있다.

소셜 복구 메커니즘에는 가족, 친구와 같은 web2.0 계정이 guardians가 사용된다.

**지갑을 복구 == 새로운 EOA를 기존 스마트 지갑(SmartWallet)과 연결하는 것**을 의미.

- 지갑의 소유권(서명 권한)을 옮기는 것과 같다.

### Flow of recovery

**🔐 1단계: Email 인증 (본인 확인)**

- 사용자가 복구 요청 시 → email로 본인 확인 링크 전송
- 링크를 클릭하면 백엔드 또는 프론트에서 “복구 토큰” 발급
- 이걸로 복구 요청이 **정상 사용자로부터 왔는지 증명**

**🧾 2단계: Guardian 서명 요청 (2-of-3)**

- 복구 요청을 smart contract에 등록 (requestRecovery(oldOwner, newOwner))
- 3명의 guardian에게 서명 요청 전송
- 2명 이상이 서명 (approveRecovery(...))하면 복구 확정 가능
- 복구 조건 충족 시 → executeRecovery(newOwner) 실행 가능

```solidity
[사용자]
   │
   ├─> 이메일 인증 (1차 인증) -> DB(EOA, E-mail, SCA)
   │
   ▼
[복구 요청 등록 (requestRecovery)]
   │
   ├─> Guardian1에게 서명 요청
   ├─> Guardian2에게 서명 요청
   └─> Guardian3에게 서명 요청
   │
   ▼
[Guardian 2명 이상 서명 완료]
   │
   ▼
[executeRecovery] → signer 업데이트 → 복구 완료 ✅
```

## Smart Contract

**1. SmartWallet (스마트 지갑)**

> 사용자의 자산을 보관하고, signer를 바꿀 수 있는 지갑
> 

**📦 역할:**

- 현재 소유자만 트랜잭션 실행 가능 (onlyOwner)
- 소유자 변경이 가능해야 함 (changeOwner() 또는 recover())

**2. RecoveryManager (복구 관리자)**

> 복구 요청을 추적하고, 서명 수집 → 조건 만족 시 스마트 지갑에 새 owner 등록
> 

**📦 역할:**

- 이메일 인증 후 복구 요청 등록 (이건 오프체인에서 트리거)
- Guardian의 서명을 수집
- 조건이 만족되면 SmartWallet의 changeOwner() 호출

**3. (선택) GuardianRegistry or EmailVerifier**

> Guardian을 등록하거나, 오프체인 인증 결과를 관리 (보통 off-chain으로 처리)
> 
- Guardian 리스트 등록 (addGuardian(user, guardian))
- 인증 완료 여부 저장 (또는 오라클처럼 email 서버가 true로 셋팅)
- 해당 프로젝트에서는 Guradians를 따로 관리하는 컨트랙트를 사용할 예정
- email은 그냥 db에 저장
