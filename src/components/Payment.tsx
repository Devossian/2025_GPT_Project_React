import "../styles/Payment.css";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

// 토큰 데이터
const tokens = [
  { amount: 1000, price: "1,000원" },
  { amount: 3000, price: "3,000원" },
  { amount: 5000, price: "5,000원" },
];

// paymentData의 타입 정의
/*interface PaymentData {
  orderId: string;
  amount: number;
  paymentKey: string;
}*/

const Payment = () => {
  const [userTokens] = useState(0); // 보유한 토큰 상태
  const [loading, setLoading] = useState(false);  // 로딩 상태
  const baseUrl = window.location.origin;

  const handlePurchase = async (amount: number) => {
    if (window.TossPayments) {
      const tossPayments = window.TossPayments("test_ck_Z1aOwX7K8m7wYLo7vxMaVyQxzvNP"); // 클라이언트 키

      try {
        setLoading(true);  // 로딩 시작

        // 결제 세션 생성 요청 (백엔드 API 호출)
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post('/payment/payment-session', {
          custom_key: 'user123',
          amount,
        }, {
          headers: {
            'Authorization' : `Token ${token}`
          }
        });

        const data = await response.data;
        const orderId = data.order_id;  // 백엔드에서 반환받은 order_id

        // 토스페이먼츠 결제 요청
        tossPayments.requestPayment("카드", {
          amount: amount,
          orderId: orderId,
          orderName: `토큰 ${amount}개`,
          customerName: "user@example.com", // 사용자의 이메일
          successUrl: `${baseUrl}/success`, // 결제 성공 시 리디렉션 URL
          failUrl: `${baseUrl}/fail`, // 결제 실패 시 리디렉션 URL
        });

        // 결제 성공 시 이벤트 처리
        /*tossPayments.on('payment_success', async (paymentData: PaymentData) => {
          const { orderId, amount, paymentKey } = paymentData;

          // 결제 승인 요청 (백엔드 API 호출)
          const confirmResponse = await axiosInstance.post('/payment/confirm', {
            orderId: orderId,
            amount: amount,
            paymentKey: paymentKey
          }, {
            headers: {
              'Authorization' : `Token ${token}`
            }
          });

          const confirmData = await confirmResponse.data;
          alert(confirmData.message);  // "결제 승인 완료" 메시지 표시
        });*/
      } catch (error) {
        console.error("결제 세션 생성 실패", error);
        alert('결제 세션 생성 실패');
      } finally {
        setLoading(false);  // 로딩 종료
      }
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
            <button
              className={`purchase-button ${loading ? 'loading' : ''}`}
              onClick={() => handlePurchase(token.amount)}
              disabled={loading}
            >
              {loading ? '결제 처리 중...' : `구매하기`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
