import { useEffect, useRef, useState } from "react"
import axiosInstance from "../api/axiosInstance";
import { useSearchParams } from 'react-router-dom';

const Success = () => {
    const [searchParams] = useSearchParams();
    const didRunRef = useRef(false);
    const [status, setStatus] = useState("processing");
  
    useEffect(() => {
        if (didRunRef.current) return; // 디버그 때 두 번 실행되는거 방지
        didRunRef.current = true;

        const confirmPayment = async () => {
            if (window.TossPayments) {
            const orderId = searchParams.get("orderId") ?? "";
            const amountString = searchParams.get("amount") ?? "0";
            const paymentKey = searchParams.get("paymentKey") ?? "";
        
            // amountString을 number로 변환
            const amount = parseFloat(amountString);
        
            const token = localStorage.getItem("token");
        
            try {
                // 결제 승인 요청 (백엔드 API 호출)
                const confirmResponse = await axiosInstance.post(
                "/payment/confirm",
                {
                    orderId,
                    amount,
                    paymentKey,
                },
                {
                    headers: {
                    Authorization: `Token ${token}`,
                    },
                }
                );
        
                const confirmData = confirmResponse.data;
                setStatus("success"); // 성공 상태로 업데이트
                alert(confirmData.message); // "결제 승인 완료" 메시지 표시
            } catch (error) {
                console.error("결제 승인 요청 중 오류 발생", error);
                setStatus("fail"); // 실패 상태로 업데이트
                alert("결재 승인 요청 중 오류 발생");
            }
        }
    };
    
    confirmPayment();
    }, [searchParams]);

      
    return (
        <div>
        {status === "processing" && <h1>결제 승인 처리중...</h1>}
        {status === "success" && <h1>결제 승인!</h1>}
        {status === "fail" && <h1>결제 승인 실패</h1>}
        </div>
    );
};

export default Success;