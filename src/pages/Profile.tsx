// Profile.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from "../api/axiosInstance";

interface ProfileProps {
  user: { username: string } | null,
  balance: number;
}

interface Charge {
  amount : number;
  approved_at : string;
}

const Profile: React.FC<ProfileProps> = ({ user, balance }) => {
  const [paymentHistory, setPaymentHistory] = useState<Charge[]>([]);
  useEffect(()=>{
    if(user?.username){
      const token = localStorage.getItem('token');
      axiosInstance.get(`/stat/charge`, {
        headers: {
          'Authorization' : `Bearer ${token}`,
        },
      })
        .then(response => {
          const convertedRecords = response.data.charges.map((chg: Charge) => ({
            amount: chg.amount,
            approved_at: chg.approved_at.slice(0, 19).replace('T', ' '),
          }));
          setPaymentHistory(convertedRecords);
        })
        .catch(error => {
          console.error('사용 내역을 불러오는 중 오류 발생:', error);
        });
    }
  }, []);

  return (
    <div className="profile-container" style={{ padding: '20px' }}>
      {/* 사용자 정보 영역 */}
      <div 
        className="user-info" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <div>
          <strong>사용자 이름:</strong> {user?.username}
        </div>
        <div>
          <strong>잔고:</strong> {balance}
        </div>
      </div>

      {/* 결제 내역 영역 (스크롤 가능) */}
      <div 
        className="payment-history" 
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          maxHeight: '300px',
          overflowY: 'scroll'
        }}
      >
        {paymentHistory.length > 0 ? (
          paymentHistory.map((entry, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0',
                borderBottom: index !== paymentHistory.length - 1 ? '1px solid #eee' : 'none'
              }}
            >
              <span><strong>구매한 토큰 수:</strong> {entry.amount}</span>
              <span style={{ marginLeft: '10px' }}>
                <strong>일시:</strong> {entry.approved_at}
              </span>
            </div>
          ))
        ) : (
          <div>결제 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
