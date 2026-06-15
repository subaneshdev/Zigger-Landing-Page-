import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy({ onBack }) {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '120px 0 80px' }}>
      
      {/* Scope specific styles */}
      <style>{`
        .privacy-doc-container [data-custom-class='body'], 
        .privacy-doc-container [data-custom-class='body'] * {
          background: transparent !important;
        }
        .privacy-doc-container [data-custom-class='title'], 
        .privacy-doc-container [data-custom-class='title'] * {
          font-family: Arial, sans-serif !important;
          font-size: 26px !important;
          color: #000000 !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
        }
        .privacy-doc-container [data-custom-class='subtitle'], 
        .privacy-doc-container [data-custom-class='subtitle'] * {
          font-family: Arial, sans-serif !important;
          color: #595959 !important;
          font-size: 14px !important;
          font-weight: bold !important;
        }
        .privacy-doc-container [data-custom-class='heading_1'], 
        .privacy-doc-container [data-custom-class='heading_1'] * {
          font-family: Arial, sans-serif !important;
          font-size: 19px !important;
          color: #000000 !important;
          font-weight: 800 !important;
          margin-top: 32px !important;
          margin-bottom: 16px !important;
        }
        .privacy-doc-container [data-custom-class='heading_2'], 
        .privacy-doc-container [data-custom-class='heading_2'] * {
          font-family: Arial, sans-serif !important;
          font-size: 17px !important;
          color: #000000 !important;
          font-weight: 700 !important;
          margin-top: 24px !important;
          margin-bottom: 12px !important;
        }
        .privacy-doc-container [data-custom-class='body_text'], 
        .privacy-doc-container [data-custom-class='body_text'] * {
          color: #595959 !important;
          font-size: 14px !important;
          font-family: Arial, sans-serif !important;
          line-height: 1.6 !important;
        }
        .privacy-doc-container [data-custom-class='link'], 
        .privacy-doc-container [data-custom-class='link'] * {
          color: #3030F1 !important;
          font-size: 14px !important;
          font-family: Arial, sans-serif !important;
          word-break: break-word !important;
          text-decoration: underline !important;
        }
      `}</style>

      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="btn-secondary"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '40px',
            padding: '12px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(41, 33, 27, 0.1)',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Document Wrapper */}
        <div 
          className="privacy-doc-container"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '32px',
            padding: '48px',
            border: '1px solid rgba(41, 33, 27, 0.06)',
            boxShadow: 'var(--shadow-soft)'
          }}
        >
          
          {/* Logo SVG */}
          <span style={{ 
            display: 'block', 
            margin: '0 auto 3.125rem', 
            width: '11.125rem', 
            height: '2.375rem', 
            background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAxNzggMzgiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRDFEMUQxIiBkPSJNNC4yODMgMjQuMTA3Yy0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY2LS43NjhoLS4wODVjLjA1Ny41MDIuMDg2Ljc5Mi4wODYuODd2Mi40MzRILjk4NXYtOC42NDhoMS4zMzJsLjIzMS43NzloLjA3NmMuMzgzLS41OTQuOTUtLjg5MiAxLjcwMi0uODkyLjcxIDAgMS4yNjQuMjc0IDEuNjY1LjgyMi40MDEuNTQ4LjYwMiAxLjMwOS42MDIgMi4yODMgMCAuNjQtLjA5NCAxLjE5OC0uMjgyIDEuNjctLjE4OC40NzMtLjQ1Ni44MzMtLjgwMyAxLjA4LS4zNDcuMjQ3LS43NTYuMzctMS4yMjUuMzd6TTMuOCAxOS4xOTNjLS40MDUgMC0uNy4xMjQtLjg4Ni4zNzMtLjE4Ny4yNDktLjI4My42Ni0uMjkgMS4yMzN2LjE3N2MwIC42NDUuMDk1IDEuMTA3LjI4NyAxLjM4Ni4xOTIuMjguNDk1LjQxOS45MS40MTkuNzM0IDAgMS4xMDEtLjYwNSAxLjEwMS0xLjgxNiAwLS41OS0uMDktMS4wMzQtLjI3LTEuMzI5LS4xODItLjI5NS0uNDY1LS40NDMtLjg1Mi0uNDQzem01LjU3IDEuNzk0YzAgLjU5NC4wOTggMS4wNDQuMjkzIDEuMzQ4LjE5Ni4zMDQuNTEzLjQ1Ny45NTQuNDU3LjQzNyAwIC43NS0uMTUyLjk0Mi0uNDU0LjE5Mi0uMzAzLjI4OC0uNzUzLjI4OC0xLjM1MSAwLS41OTUtLjA5Ny0xLjA0LS4yOS0xLjMzOC0uMTk0LS4yOTctLjUxLS40NDUtLjk1LS40NDUtLjQzOCAwLS43NTMuMTQ3LS45NDYtLjQ0My0uMTk0LS4yOTUtLjI5LS43NDItLjI5IDEuMzR6bTQuMTUzIDBjMCAuOTc3LS4yNTggMS43NDItLjc3NCAyLjI5My0uNTE1LjU1Mi0xLjIzMy44MjctMi4xNTQuODI3LS41NzYgMC0xLjA4NS0uMTI2LTEuNTI1LS4zNzhhMi41MiAyLjUyIDAgMCAxLTEuMDE1LTEuMDg4Yy0uMjM3LS40NzMtLjM1NS0xLjAyNC0uMzU1LTEuNjU0IDAtLjk4MS4yNTYtMS43NDQuNzY4LTIuMjg4LjUxMi0uNTQ1IDEuMjMyLS44MTcgMi4xNi0uODE3LjU3NiAwIDEuMDg1LjEyNiAxLjUyNS4zNzYuNDQuMjUxLjc3OS42MSAxLjAxNSAxLjA4LjIzNi40NjkuMzU1IDEuMDE5LjM1NSAxLjY0OXpNMTkuNzEgMjRsLS40NjItMi4xLS42MjMtMi42NTNoLS4wMzdMMTcuNDkzIDI0SDE1LjczbC0xLjcwOC02LjAwNWgxLjYzM2wuNjkzIDIuNjU5Yy4xMS40NzYuMjI0IDEuMTMzLjMzOCAxLjk3MWguMDMyYy4wMTUtLjI3Mi4wNzctLjcwNC4xODgtMS4yOTRsLjA4Ni0uNDU3Ljc0Mi0yLjg3OWgxLjgwNGwuNzA0IDIuODc5Yy4wMTQuMDc5LjAzNy4xOTUuMDY3LjM1YTIwLjk5OCAyMC45OTggMCAwIDEgLjE2NyAxLjAwMmMuMDIzLjE2NS4wMzYuMjk5LjA0LjM5OWguMDMyYy4wMzItLjI1OC4wOS0uNjExLjE3Mi0xLjA2LjA4Mi0uNDUuMTQxLS43NTQuMTc3LS45MTFsLjcyLTIuNjU5aDEuNjA2TDIxLjQ5NCAyNGgtMS43ODN6bTcuMDg2LTQuOTUyYy0uMzQ4IDAtLjYyLjExLS44MTcuMzMtLjE5Ny4yMi0uMzEuNTMzLS4zMzguOTM3aDIuMjk5Yy0uMDA4LS40MDQtLjExMy0uNzE3LS4zMTctLjkzNy0uMjA0LS4yMi0uNDgtLjMzLS44MjctLjMzem0uMjMgNS4wNmMtLjk2NiAwLTEuNzIyLS4yNjctMi4yNjYtLjgtLjU0NC0uNTM0LS44MTYtMS4yOS0uODE2LTIuMjY3IDAtMS4wMDcuMjUxLTEuNzg1Ljc1NC0yLjMzNC41MDMtLjU1IDEuMTk5LS44MjUgMi4wODctLjgyNS44NDggMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDcyLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MSAwIC43MDMtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45Mi4zMmE1Ljc5IDUuNzkgMCAwIDEtMS4xOTEuMTA0em03LjI1My02LjIyNmMuMjIyIDAgLjQwNi4wMTYuNTUzLjA0OWwtLjEyNCAxLjUzNmExLjg3NyAxLjg3NyAwIDAgMC0uNDgzLS4wNTRjLS41MjMgMC0uOTMuMTM0LTEuMjIyLjQwMy0uMjkyLjI2OC0uNDM4LjY0NC0uNDM4IDEuMTI4VjI0aC0xLjYzOHYtNi4wMDVoMS4yNGwuMjQyIDEuMDFoLjA4Yy4xODctLjMzNy40MzktLjYwOC43NTYtLjgxNGExLjg2IDEuODYgMCAwIDEgMS4wMzQtLjMwOXptNC4wMjkgMS4xNjZjLS4zNDcgMC0uNjIuMTEtLjgxNy4zMy0uMTk3LjIyLS4zMS41MzMtLjMzOC45MzdoMi4yOTljLS4wMDctLjQwNC0uMTEzLS43MTctLjMxNy0uOTM3LS4yMDQtLjIyLS40OC0uMzMtLjgyNy0uMzN6bS4yMyA1LjA2Yy0uOTY2IDAtMS43MjItLjI2Ny0yLjI2Ni0uOC0uNTQ0LS41MzQtLjgxNi0xLjI5LS44MTYtMi4yNjcgMC0xLjAwNy4yNTEtMS43ODUuNzU0LTIuMzM0LjUwNC0uNTUgMS4yLS44MjUgMi4wODctLjgyNS44NDkgMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDczLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MiAwIC43MDQtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45MTkuMzJhNS43OSA1Ljc5IDAgMCAxLTEuMTkyLjEwNHptNS44MDMgMGMtLjcwNiAwLTEuMjYtLjI3NS0xLjY2My0uODIyLS40MDMtLjU0OC0uNjA0LTEuMzA3LS42MDQtMi4yNzggMC0uOTg0LjIwNS0xLjc1Mi42MTUtMi4zMDEuNDEtLjU1Ljk3NS0uODI1IDEuNjk1LS44MjUuNzU1IDAgMS4zMzIuMjk0IDEuNzI5Ljg4MWguMDU0YTYuNjk3IDYuNjk3IDAgMCAxLS4xMjQtMS4xOTh2LTEuOTIyaDEuNjQ0VjI0SDQ2LjQzbC0uMzE3LS43NzloLS4wN2MtLjM3Mi41OTEtLjk0Ljg4Ni0xLjcwMi44ODZ6bS41NzQtMS4zMDZjLjQyIDAgLjcyNi0uMTIxLjkyMS0uMzY1LjE5Ni0uMjQzLjMwMi0uNjU3LjMyLTEuMjR2LS4xNzhjMC0uNjQ0LS4xLTEuMTA2LS4yOTgtMS4zODYtLjE5OS0uMjc5LS41MjItLjQxOS0uOTctLjQxOWEuOTYyLjk2MiAwIDAgMC0uODUuNDY1Yy0uMjAzLjMxLS4zMDQuNzYtLjMwNCAxLjM1IDAgLjU5Mi4xMDIgMS4wMzUuMzA2IDEuMzMuMjA0LjI5Ni40OTYuNDQzLjg3NS40NDN6bTEwLjkyMi00LjkyYy43MDkgMCAxLjI2NC4yNzcgMS42NjUuODMuNC41NTMuNjAxIDEuMzEyLjYwMSAyLjI3NSAwIC45OTItLjIwNiAxLjc2LS42MiAyLjMwNC0uNDE0LjU0NC0uOTc3LjgxNi0xLjY5LjgxNi0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY1OS0uNzY4aC0uMTEzbC0uMjc0LjY2MWgtMS4yNTF2LTguMzU3aDEuNjM4djEuOTQ0YzAgLjI0Ny0uMDIxLjY0My0uMDY0IDEuMTg3aC4wNjRjLjM4My0uNTk0Ljk1LS44OTIgMS43MDMtLjg5MnptLS41MjcgMS4zMWMtLjQwNCAwLS43LjEyNS0uODg2LjM3NC0uMTg2LjI0OS0uMjgzLjY2LS4yOSAxLjIzM3YuMTc3YzAgLjY0NS4wOTYgMS4xMDcuMjg3IDEuMzg2LjE5Mi4yOC40OTUuNDE5LjkxLjQxOS4zMzcgMCAuNjA1LS4xNTUuODA0LS40NjUuMTk5LS4zMS4yOTgtLjc2LjI5OC0xLjM1IDAtLjU5MS0uMS0xLjAzNS0uMy0xLjMzYS45NDMuOTQzIDAgMCAwLS44MjMtLjQ0M3ptMy4xODYtMS4xOTdoMS43OTRsMS4xMzQgMy4zNzljLjA5Ni4yOTMuMTYzLjY0LjE5OCAxLjA0MmguMDMzYy4wMzktLjM3LjExNi0uNzE3LjIzLTEuMDQybDEuMTEyLTMuMzc5aDEuNzU3bC0yLjU0IDYuNzczYy0uMjM0LjYyNy0uNTY2IDEuMDk2LS45OTcgMS40MDctLjQzMi4zMTItLjkzNi40NjgtMS41MTIuNDY4LS4yODMgMC0uNTYtLjAzLS44MzMtLjA5MnYtMS4zYTIuOCAyLjggMCAwIDAgLjY0NS4wN2MuMjkgMCAuNTQzLS4wODguNzYtLjI2Ni4yMTctLjE3Ny4zODYtLjQ0NC41MDgtLjgwM2wuMDk2LS4yOTUtMi4zODUtNS45NjJ6Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzMpIj4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTkiIGN5PSIxOSIgcj0iMTkiIGZpbGw9IiNFMEUwRTAiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTIyLjQ3NCAxNS40NDNoNS4xNjJMMTIuNDM2IDMwLjRWMTAuMzYzaDE1LjJsLTUuMTYyIDUuMDh6Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGZpbGw9IiNEMkQyRDIiIGQ9Ik0xMjEuNTQ0IDE0LjU2di0xLjcyOGg4LjI3MnYxLjcyOGgtMy4wMjRWMjRoLTIuMjR2LTkuNDRoLTMuMDA4em0xMy43NDQgOS41NjhjLTEuMjkgMC0yLjM0MS0uNDE5LTMuMTUyLTEuMjU2LS44MS0uODM3LTEuMjE2LTEuOTQ0LTEuMjE2LTMuMzJzLjQwOC0yLjQ3NyAxLjIyNC0zLjMwNGMuODE2LS44MjcgMS44NzItMS4yNCAzLjE2OC0xLjI0czIuMzYuNDAzIDMuMTkyIDEuMjA4Yy44MzIuODA1IDEuMjQ4IDEuODggMS4yNDggMy4yMjQgMCAuMzEtLjAyMS41OTctLjA2NC44NjRoLTYuNDY0Yy4wNTMuNTc2LjI2NyAxLjA0LjY0IDEuMzkyLjM3My4zNTIuODQ4LjUyOCAxLjQyNC41MjguNzc5IDAgMS4zNTUtLjMyIDEuNzI4LS45NmgyLjQzMmEzLjg5MSAzLjg5MSAwIDAgMS0xLjQ4OCAyLjA2NGMtLjczNi41MzMtMS42MjcuOC0yLjY3Mi44em0xLjQ4LTYuNjg4Yy0uNC0uMzUyLS44ODMtLjUyOC0xLjQ0OC0uNTI4cy0xLjAzNy4xNzYtMS40MTYuNTI4Yy0uMzc5LjM1Mi0uNjA1LjgyMS0uNjggMS40MDhoNC4xOTJjLS4wMzItLjU4Ny0uMjQ4LTEuMDU2LS42NDgtMS40MDh6bTcuMDE2LTIuMzA0djEuNTY4Yy41OTctMS4xMyAxLjQ2MS0xLjY5NiAyLjU5Mi0xLjY5NnYyLjMwNGgtLjU2Yy0uNjcyIDAtMS4xNzkuMTY4LTEuNTIuNTA0LS4zNDEuMzM2LS41MTIuOTE1LS41MTIgMS43MzZWMjRoLTIuMjU2di04Ljg2NGgyLjI1NnptNi40NDggMHYxLjMyOGMuNTY1LS45NyAxLjQ4My0xLjQ1NiAyLjc1Mi0xLjQ1Ni42NzIgMCAxLjI3Mi4xNTUgMS44LjQ2NC41MjguMzEuOTM2Ljc1MiAxLjIyNCAxLjMyOC4zMS0uNTU1LjczMy0uOTkyIDEuMjcyLTEuMzEyYTMuNDg4IDMuNDg4IDAgMCAxIDEuODE2LS40OGMxLjA1NiAwIDEuOTA3LjMzIDIuNTUyLjk5Mi42NDUuNjYxLjk2OCAxLjU5Ljk2OCAyLjc4NFYyNGgtMi4yNHYtNC44OTZjMC0uNjkzLS4xNzYtMS4yMjQtLjUyOC0xLjU5Mi0uMzUyLS4zNjgtLjgzMi0uNTUyLTEuNDQtLjU1MnMtMS4wOS4xODQtMS40NDguNTUyYy0uMzU3LjM2OC0uNTM2Ljg5OS0uNTM2IDEuNTkyVjI0aC0yLjI0di00Ljg5NmMwLS42OTMtLjE3Ni0xLjIyNC0uNTI4LTEuNTkyLS4zNTItLjM2OC0uODMyLS41NTItMS40NC0uNTUycy0xLjA5LjE4NC0xLjQ0OC41NTJjLS4zNTcuMzY4LS41MzYuODk5LS41MzYgMS41OTJWMjRoLTIuMjU2di04Ljg2NGgyLjI1NnpNMTY0LjkzNiAyNFYxMi4xNmgyLjI1NlYyNGgtMi4yNTZ6bTcuMDQtLjE2bC0zLjQ3Mi04LjcwNGgyLjUyOGwyLjI1NiA2LjMwNCAyLjM4NC02LjMwNGgyLjM1MmwtNS41MzYgMTMuMDU2aC0yLjM1MmwxLjg0LTQuMzUyeiIvPgogICAgPC9nPgo8L3N2Zz4K) center no-repeat' 
          }}
        />

          {/* Legal content wrapper */}
          <div data-custom-class="body" style={{ color: '#595959', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.5' }}>
          
          <div>
            <strong>
              <span style={{ fontSize: '26px' }}>
                <span data-custom-class="title">
                  <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px', color: '#000000' }}>PRIVACY POLICY</h1>
                </span>
              </span>
            </strong>
          </div>
          
          <div>
            <span style={{ color: 'rgb(127, 127, 127)' }}>
              <strong>
                <span style={{ fontSize: '15px' }}>
                  <span data-custom-class="subtitle">Last updated May 29, 2026</span>
                </span>
              </strong>
            </span>
          </div>

          <div style={{ lineHeight: '1.5', marginTop: '24px' }}>
            <span style={{ color: 'rgb(89, 89, 89)', fontSize: '15px' }}>
              <span data-custom-class="body_text">
                This Privacy Notice for <strong>Ziggers</strong> ('<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), describes how and why we might access, collect, store, use, and/or share ('<strong>process</strong>') your personal information when you use our services ('<strong>Services</strong>'), including when you:
              </span>
            </span>
          </div>

          <ul>
            <li data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <span style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
                <span data-custom-class="body_text">Download and use our mobile application (<strong>ziggers</strong>), or any other application of ours that links to this Privacy Notice</span>
              </span>
            </li>
            <li data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <span style={{ fontSize: '15px' }}>
                <span data-custom-class="body_text">
                  Use <strong>ziggers</strong>.{' '}
                </span>
              </span>
              <div style={{ 
                margin: '16px 0', 
                padding: '20px', 
                backgroundColor: 'var(--color-surface)', 
                borderRadius: '16px', 
                borderLeft: '4px solid var(--color-accent)',
                color: '#595959' 
              }}>
                <strong>Ziggers</strong> is a mobile platform that connects employers with local gig workers for short-term, on-ground work opportunities across India. Our platform enables structured job posting, worker discovery, GPS-based attendance tracking, proof-of-work submission, and protected payment processing — all designed to bring transparency and trust to informal short-term employment.
                <br/><br/>
                As part of delivering these services, we collect and process certain personal information from both employers and gig workers, including identity details, location data, payment information, and work history. We are committed to handling this information responsibly, transparently, and in accordance with applicable Indian data protection laws.
                <br/><br/>
                This Privacy Policy explains what information we collect, why we collect it, how it is used and stored, and the choices you have regarding your data. By using the Ziggers app or any of our related services, you agree to the practices described in this policy.
                If you have any questions or concerns about how your data is handled, you can reach us at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>.
                <br/><br/>
                <strong>Core features:</strong>
                <ul>
                  <li><strong>Structured job posting</strong> — employers post gigs with clear details (location, timing, pay, dress code)</li>
                  <li><strong>Local worker discovery</strong> — matches nearby available workers to posted gigs</li>
                  <li><strong>Prepaid, protected payments</strong> — funds are held upfront so workers are guaranteed to get paid</li>
                  <li><strong>Live GPS tracking</strong> — employers can see workers once they arrive on-site</li>
                  <li><strong>Proof-based completion</strong> — workers submit evidence of completed work</li>
                  <li><strong>Performance ratings</strong> — builds a reputation layer over time, giving top workers access to better gigs and higher pay</li>
                </ul>
                <br/>
                <strong>The bigger vision</strong> is to become the credentialing and operating system for India's on-ground informal workforce — turning gig work from a fallback into a legitimate career path.
                It's essentially <strong>Uber meets Upwork, built specifically for India's blue-collar daily-wage market</strong>, currently being developed out of Chennai by a student team under the collective Unfounded.in.
              </div>
            </li>
            <li data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <span data-custom-class="body_text">Engage with us in other related ways, including any marketing or events</span>
            </li>
          </ul>
          
          <div style={{ lineHeight: '1.5' }}>
            <span data-custom-class="body_text">
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>.
            </span>
          </div>

          {/* SUMMARY OF KEY POINTS */}
          <div data-custom-class="heading_1">
            <h2>SUMMARY OF KEY POINTS</h2>
          </div>
          <div style={{ lineHeight: '1.5' }}>
            <span data-custom-class="body_text">
              <strong><em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <a data-custom-class="link" href="#toc">table of contents</a> below to find the section you are looking for.</em></strong>
            </span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '16px' }}>
            <span data-custom-class="body_text"><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a data-custom-class="link" href="#personalinfo">personal information you disclose to us</a>.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. Learn more about <a data-custom-class="link" href="#sensitiveinfo">sensitive information we process</a>.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a data-custom-class="link" href="#infouse">how we process your information</a>.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about <a data-custom-class="link" href="#whoshare">when and with whom we share your personal information</a>.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>How do we keep your information safe?</strong> We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a data-custom-class="link" href="#infosafe">how we keep your information safe</a>.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a data-custom-class="link" href="#privacyrights">your privacy rights</a>.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text"><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</span>
          </div>
          <div style={{ lineHeight: '1.5', marginTop: '12px' }}>
            <span data-custom-class="body_text">Want to learn more about what we do with any information we collect? <a data-custom-class="link" href="#toc">Review the Privacy Notice in full</a>.</span>
          </div>

          {/* TABLE OF CONTENTS */}
          <div id="toc" data-custom-class="heading_1" style={{ borderTop: '1px solid rgba(41,33,27,0.1)', paddingTop: '24px', marginTop: '32px' }}>
            <h2>TABLE OF CONTENTS</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            <a data-custom-class="link" href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a>
            <a data-custom-class="link" href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a>
            <a data-custom-class="link" href="#whoshare">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>
            <a data-custom-class="link" href="#cookies">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a>
            <a data-custom-class="link" href="#sociallogins">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
            <a data-custom-class="link" href="#inforetain">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a>
            <a data-custom-class="link" href="#infosafe">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
            <a data-custom-class="link" href="#infominors">8. DO WE COLLECT INFORMATION FROM MINORS?</a>
            <a data-custom-class="link" href="#privacyrights">9. WHAT ARE YOUR PRIVACY RIGHTS?</a>
            <a data-custom-class="link" href="#DNT">10. CONTROLS FOR DO-NOT-TRACK FEATURES</a>
            <a data-custom-class="link" href="#policyupdates">11. DO WE MAKE UPDATES TO THIS NOTICE?</a>
            <a data-custom-class="link" href="#contact">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
            <a data-custom-class="link" href="#request">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a>
          </div>

          {/* SECTION 1 */}
          <div id="infocollect" data-custom-class="heading_1">
            <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
          </div>
          <div data-custom-class="heading_2" id="personalinfo">
            <h3>Personal information you disclose to us</h3>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em>
          </p>
          <p data-custom-class="body_text">
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>
          <p data-custom-class="body_text">
            <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>names</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>phone numbers</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>email addresses</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>mailing addresses</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>job titles</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>usernames</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>passwords</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>contact preferences</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>billing addresses</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>debit/credit card numbers</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>contact or authentication data</li>
          </ul>

          <div id="sensitiveinfo" style={{ lineHeight: '1.5' }}>
            <span data-custom-class="body_text"><strong>Sensitive Information.</strong> When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:</span>
          </div>
          <ul style={{ paddingLeft: '20px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>social security numbers or other government identifiers</li>
          </ul>

          <p data-custom-class="body_text">
            <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by <strong>ZOHO PAY</strong>. You may find their privacy notice link(s) here: <a target="_blank" data-custom-class="link" href="https://www.zoho.com/in/payments/privacy.html" rel="noreferrer">https://www.zoho.com/in/payments/privacy.html</a>.
          </p>

          <p data-custom-class="body_text">
            <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called '<a data-custom-class="link" href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>' below.
          </p>

          <p data-custom-class="body_text">
            <strong>Application Data.</strong> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '8px' }}>
              <em>Geolocation Information.</em> We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.
            </li>
            <li data-custom-class="body_text" style={{ marginBottom: '8px' }}>
              <em>Mobile Device Access.</em> We may request access or permission to certain features from your mobile device, including your mobile device's camera, contacts, microphone, sms messages, storage, sensors, reminders, and other features. If you wish to change our access or permissions, you may do so in your device's settings.
            </li>
            <li data-custom-class="body_text" style={{ marginBottom: '8px' }}>
              <em>Mobile Device Data.</em> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device's operating system or platform, the type of mobile device you use, your mobile device's unique device ID, and information about the features of our application(s) you accessed.
            </li>
            <li data-custom-class="body_text" style={{ marginBottom: '8px' }}>
              <em>Push Notifications.</em> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.
            </li>
          </ul>
          <p data-custom-class="body_text">
            This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
          </p>

          {/* SECTION 2 */}
          <div id="infouse" data-custom-class="heading_1">
            <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em>
          </p>
          <p data-custom-class="body_text">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To facilitate account creation and authentication and otherwise manage user accounts.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To deliver and facilitate delivery of services to the user, including matching gigs based on location.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To conduct KYC verifications and fraud monitoring.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To manage secure, protected prepaid Zoho Pay escrow deposits.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To enforce active dispute mediation and anti-tamper telemetry check-ins.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To send you administrative information, including about changes to our terms and policies.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>To save or protect an individual's vital interest.</li>
          </ul>

          {/* SECTION 3 */}
          <div id="whoshare" data-custom-class="heading_1">
            <h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We may share information in specific situations described in this section and/or with the following third parties.</em>
          </p>
          <p data-custom-class="body_text">
            We share details between matched employers and gig workers during active shifts. Wallet and banking operations are securely synchronized with Zoho Pay and Supabase storage layers. We do not sell your personal details to third-party advertisers.
          </p>

          {/* SECTION 4 */}
          <div id="cookies" data-custom-class="heading_1">
            <h2>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We may use cookies and other tracking technologies to collect and store your information.</em>
          </p>
          <p data-custom-class="body_text">
            We do not use browser advertising tracking cookies. We utilise secure local storage tokens to preserve your active app credentials and login sessions securely.
          </p>

          {/* SECTION 5 */}
          <div id="sociallogins" data-custom-class="heading_1">
            <h2>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em>
          </p>
          <p data-custom-class="body_text">
            Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
          </p>
          <p data-custom-class="body_text">
            We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information.
          </p>

          {/* SECTION 6 */}
          <div id="inforetain" data-custom-class="heading_1">
            <h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</em>
          </p>
          <p data-custom-class="body_text">
            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). Data is preserved only as long as necessary to comply with financial audits and tax records.
          </p>

          {/* SECTION 7 */}
          <div id="infosafe" data-custom-class="heading_1">
            <h2>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We aim to protect your personal information through a system of organisational and technical security measures.</em>
          </p>
          <p data-custom-class="body_text">
            We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. Credentials, private tokens, and coordinates are locked in secure OS-provided hardware enclaves (Keychain/Keystore) and stored behind SSL-secured Supabase DB blocks. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
          </p>

          {/* SECTION 8 */}
          <div id="infominors" data-custom-class="heading_1">
            <h2>8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>We do not knowingly collect data from or market to children under 18 years of age.</em>
          </p>
          <p data-custom-class="body_text">
            We do not knowingly recruit or collect data from individuals under 18 years of age. Vetted KYC checks will immediately terminate profiles violating age thresholds. By using the Services, you represent that you are at least 18. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.
          </p>

          {/* SECTION 9 */}
          <div id="privacyrights" data-custom-class="heading_1">
            <h2>9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em>
          </p>
          <p data-custom-class="body_text">
            You hold total control. You can update or terminate your account directly in the mobile app settings panel. If you have questions or comments about your privacy rights, you may email us at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>.
          </p>
          <div data-custom-class="heading_2">
            <h3>Account Information</h3>
          </div>
          <p data-custom-class="body_text">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>Log in to your account settings and update your user account.</li>
            <li data-custom-class="body_text" style={{ marginBottom: '6px' }}>Contact us using the contact information provided.</li>
          </ul>
          <p data-custom-class="body_text">
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms, and/or comply with applicable legal requirements.
          </p>

          {/* SECTION 10 */}
          <div id="DNT" data-custom-class="heading_1">
            <h2>10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          </div>
          <p data-custom-class="body_text">
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
          </p>
          <p data-custom-class="body_text">
            Active GPS checking occurs exclusively during claimed shift hours. You can disable location tracking inside your mobile operating system settings at any other time.
          </p>

          {/* SECTION 11 */}
          <div id="policyupdates" data-custom-class="heading_1">
            <h2>11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
          </div>
          <p data-custom-class="body_text">
            <strong><em>In Short:</em></strong> <em>Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
          </p>
          <p data-custom-class="body_text">
            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
          </p>

          {/* SECTION 12 */}
          <div id="contact" data-custom-class="heading_1">
            <h2>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
          </div>
          <p data-custom-class="body_text">
            If you have questions or comments about this notice, you may email us at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a> or contact us by post at:
          </p>
          <p data-custom-class="body_text">
            <strong>Ziggers / Unfounded.in</strong><br/>
            No. 1 Shanthinikenthan Colony Extension, Madambakkam<br/>
            Chennai, Tamil Nadu 600126<br/>
            India
          </p>

          {/* SECTION 13 */}
          <div id="request" data-custom-class="heading_1">
            <h2>13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
          </div>
          <p data-custom-class="body_text">
            Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information.
          </p>
          <p data-custom-class="body_text">
            To request full data reviews or account deletions, submit a claim directly under <code style={{ backgroundColor: 'var(--color-surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: '600' }}>Settings &gt; Account Security &gt; Request Data Deletion</code> or email <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>. Requests are resolved within 30 business days.
          </p>

        </div>
        </div>
      </div>
    </div>
  );
}
