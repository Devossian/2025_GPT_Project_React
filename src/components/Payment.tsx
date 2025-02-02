import "../styles/Payment.css";
import PlanCard from "./PlanCard";

const plans = [
  {
    name: "Basic",
    price: "1000",
    features: [
      "GPT 4o mini에 액세스",
      "표준 음성 채팅",
      "GPT-4o에 제한적 액세스",
      "파일 업로드 및 고급 분석 제한",
      "맞춤형 GPT 사용",
    ],
    buttonText: "결제하기",
    buttonDisabled: false,
  },
  {
    name: "Plus",
    price: "3000",
    features: [
      "모든 것이 무료",
      "메시지, 파일 업로드, 고급 분석 증가",
      "고급 음성 및 영상 입력 액세스",
      "새 기능 테스트 기회",
      "Sora 영상 생성 제한적 액세스",
    ],
    buttonText: "결제하기",
    buttonDisabled: false,
  },
  {
    name: "Pro",
    price: "5000",
    features: [
      "Plus의 모든 기능",
      "o1, o1-mini, GPT-4o 무제한 액세스",
      "고급 음성 및 영상 무제한",
      "더 많은 AI 연산 처리",
      "Sora 영상 생성 추가 액세스",
    ],
    buttonText: "결제하기",
    buttonDisabled: false,
  },
];

/*const handlePayment = (plan: { name: string, price: string }) => {
  // 결제 로직 추가가
  //결제 API 호출
  alert(`${plan.name} 플랜으로 ${plan.price}원이 결제되었습니다.`);
};*/

const Payment = () => {
  return (
    <div className="payment-container">
      <h1 className="title">플랜 결제</h1>
      <div className="plans">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} isHighlighted={index === 1} />
        ))}
      </div>
    </div>
  );
};

export default Payment;
