import "../styles/Payment.css";
import { useState } from "react";

const tokens = [
  { amount: 1000, price: "1,000원" },
  { amount: 3000, price: "3,000원" },
  { amount: 5000, price: "5,000원" },
];

const Payment = () => {
  const [userTokens] = useState(0); // 보유한 토큰 상태

  const handlePurchase = (amount: number) => {
    if (window.TossPayments) {
      const tossPayments = window.TossPayments("test_ck_Ox..."); // 클라이언트 키 넣기기
      tossPayments.requestPayment("카드", {
        amount,
        orderId: `order_${Date.now()}`,
        orderName: `토큰 ${amount}개`,
        customerEmail: "user@example.com",
        successUrl: "http://localhost:3000/success", // 결제 성공 시 이동할 URL
        failUrl: "http://localhost:3000/fail", // 결제 실패 시 이동할 URL
      });
    } else {
      alert("토스페이먼츠 로드 실패!");
    }
  };

  return (
    <div className="payment-container">
      <div className="token-balance">
        <span>보유 중인 토큰:</span> <strong>{userTokens}개</strong>
        <button className="charge-button">충전하기</button>
      </div>

      <h2 className="title">토큰 충전</h2>
      <p className="description">필요한 만큼 토큰을 구매하세요.</p>
      <div className="token-list">
        {tokens.map((token, index) => (
          <div key={index} className="token-item">
            <span className="token-amount">토큰 {token.amount}개</span>
            <span className="token-price">{token.price}</span>
            <button className="purchase-button" onClick={() => handlePurchase(token.amount)}>
              구매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
