import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
        padding: '20px'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px'
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '16px'
          }}
        >
          🏆 상장 제작기
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}
        >
          손쉽게 아름다운 상장을 만들고 PNG로 다운로드하세요.
          <br />
          학교, 회사, 동아리 등 다양한 곳에서 활용할 수 있습니다.
        </p>
        <Link
          to="/edit"
          style={{
            display: 'inline-block',
            padding: '16px 48px',
            backgroundColor: '#2563eb',
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'background-color 0.2s, transform 0.2s',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          📝 상장 만들기
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

