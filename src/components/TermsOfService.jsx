import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '120px 0 80px' }}>
      
      {/* Scope specific styles */}
      <style>{`
        .terms-doc-container [data-custom-class='body'], 
        .terms-doc-container [data-custom-class='body'] * {
          background: transparent !important;
        }
        .terms-doc-container [data-custom-class='title'], 
        .terms-doc-container [data-custom-class='title'] * {
          font-family: var(--font-heading), Arial, sans-serif !important;
          font-size: 26px !important;
          color: var(--color-primary) !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
        }
        .terms-doc-container [data-custom-class='subtitle'], 
        .terms-doc-container [data-custom-class='subtitle'] * {
          font-family: var(--font-body), Arial, sans-serif !important;
          color: var(--color-text-muted) !important;
          font-size: 14px !important;
          font-weight: bold !important;
        }
        .terms-doc-container [data-custom-class='heading_1'], 
        .terms-doc-container [data-custom-class='heading_1'] * {
          font-family: var(--font-heading), Arial, sans-serif !important;
          font-size: 19px !important;
          color: var(--color-primary) !important;
          font-weight: 800 !important;
          margin-top: 32px !important;
          margin-bottom: 16px !important;
        }
        .terms-doc-container [data-custom-class='heading_2'], 
        .terms-doc-container [data-custom-class='heading_2'] * {
          font-family: var(--font-heading), Arial, sans-serif !important;
          font-size: 17px !important;
          color: var(--color-primary) !important;
          font-weight: 700 !important;
          margin-top: 24px !important;
          margin-bottom: 12px !important;
        }
        .terms-doc-container [data-custom-class='body_text'], 
        .terms-doc-container [data-custom-class='body_text'] * {
          color: var(--color-text-muted) !important;
          font-size: 14px !important;
          font-family: var(--font-body), Arial, sans-serif !important;
          line-height: 1.6 !important;
        }
        .terms-doc-container [data-custom-class='link'], 
        .terms-doc-container [data-custom-class='link'] * {
          color: var(--color-secondary) !important;
          font-size: 14px !important;
          font-family: var(--font-body), Arial, sans-serif !important;
          word-break: break-word !important;
          text-decoration: underline !important;
        }
      `}</style>

      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Button */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div 
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
              fontWeight: '600',
              color: 'inherit'
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </div>
        </Link>

        {/* Document Wrapper */}
        <div 
          className="terms-doc-container"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '32px',
            padding: '48px',
            border: '1px solid rgba(41, 33, 27, 0.06)',
            boxShadow: 'var(--shadow-soft)'
          }}
        >
          
          {/* Logo SVG (embedded from user base64 data link) */}
          <span style={{ 
            display: 'block', 
            margin: '0 auto 3.125rem', 
            width: '11.125rem', 
            height: '2.375rem', 
            background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAxNzggMzgiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRDFEMUQxIiBkPSJNNC4yODMgMjQuMTA3Yy0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY2LS43NjhoLS4wODVjLjA1Ny41MDIuMDg2Ljc5Mi4wODYuODd2Mi40MzRILjk4NXYtOC42NDhoMS4zMzJsLjIzMS43NzloLjA3NmMuMzgzLS41OTQuOTUtLjg5MiAxLjcwMi0uODkyLjcxIDAgMS4yNjQuMjc0IDEuNjY1LjgyMi40MDEuNTQ4LjYwMiAxLjMwOS42MDIgMi4yODMgMCAuNjQtLjA5NCAxLjE5OC0uMjgyIDEuNjctLjE4OC40NzMtLjQ1Ni48MzMtLjgwMyAxLjA4LS4zNDcuMjQ3LS43NTYuMzctMS4yMjUuMzd6TTMuOCAxOS4xOTNjLS40MDUgMC0uNy4xMjQtLjg4Ni4zNzMtLjE4Ny4yNDktLjE4My42Ni0uMjkgMS4yMzN2LjE3N2MwIC42NDUuMDk1IDEuMTA3LjI4NyAxLjM4Ni4xOTIuMjguNDk1LjQxOS45MS40MTkuNzM0IDAgMS4xMDEtLjYwNSAxLjEwMS0xLjgxNiAwLS41OS0uMDktMS4wMzQtLjI3LTEuMzI5LS4xIGgtLjI5NS0uNDY1LS40NDMtLjg1Mi0uNDQzem01LjU3IDEuNzk0YzAgLjU5NC4wOTggMS4wNDQuMjkzIDEuMzQ4LjE5Ni4zMDQuNTEzLjQ1Ny45NTQuNDU3LjQzNyAwIC43NS0uMTUyLjk0Mi0uNDU0LjE5Mi0uMzAzLjI4OC0uNzUzLjI4OC0xLjM1MSAwLS41OTUtLjA5Ny0xLjA0LS4yOS0xLjMzOC0uMTk0LS4yOTctLjUxLS40NDUtLjk1LS40NDUtLjQzOCAwLS43NTMuMTQ3LS45NDYtLjQ0My0uMTk0LS4yOTUtLjI5LS43NDItLjI5IDEuMzR6bTQuMTUzIDBjMCAuOTc3LS4yNTggMS43NDItLjc3NCAyLjI5My0uNTE1LjU1Mi0xLjIzMy44MjctMi4xNTQuODI3LS41NzYgMC0xLjA4NS0uMTI2LTEuNTI1LS4zNzhhMi41MiAyLjUyIDAgMCAxLTEuMDE1LTEuMDg4Yy0uMjM3LS40NzMtLjM1NS0xLjAyNC0uMzU1LTEuNjU0IDAtLjk4MS4yNTYtMS43NDQuNzY4LTIuMjg4LjUxMi0uNTQ1IDEuMjMyLS44MTcgMi4xNi0uODE3LjU3NiAwIDEuMDg1LjEyNiAxLjUyNS4zNzYgLjQ0LjI1MS43NzkuNjEgMS4wMTUgMS4wOC4yMzYuNDY5LjM1NSAxLjAxOS4zNTUgMS42NDl6TTE5LjcxIDI0bC0uNDYyLTIuMS0uNjIzLTIuNjUzaC0uMDM3TDE3LjQ5MyAyNEgxNS43M2wtMS43MDgtNi4wMDVoMS42MzNsLjY5MyAyLjY1OWMuUIDTjUgMS4xMzMgLTMzOCAxLjk3MWguMDMyYy4wMTUtLjI3Mi4wNzctLjcwNC4xODgtMS4yOTRsLjA4Ni0uNDU3Ljc0Mi0yLjg3OWgxLjgwNGwuNzA0IDIuODc5Yy4wMTQuMDc5LjAzNy4xOTUuMDY3LjM1YTIwLjk5OCAyMC45OTggMCAwIDEgLjE2NyAxLjAwMmMuMDIzLjE2NS4wMzYuMjk5LjA0LjM5OWguMDMyYy4wMzItLjI1OC4wOS0uNjExLjE3Mi0xLjA2LjA4Mi0uNDUuMTQxLS43NTQuMTc3LS45MTFsLjcyLTIuNjU5aDEuNjA2TDIxLjQ5NCAyNGgtMS43ODN6bTcuMDg2LTQuOTUyYy0uMzQ4IDAtLjYyLjExLS44MTcuMzMtLjE5Ny4yMi0uMzEuNTMzLS4zMzguOTM3aDIuMjk5Yy0uMDA4LS40MDQtLjExMy0uNzE3LS4zMTctLjkzNy0uMjA0LS4yMi0uNDgtLjMzLS44MjctLjMzem0uMjMgNS4wNmMtLjk2NiAwLTEuNzIyLS4yNjctMi4yNjYtLjgtLjU0NC0uNTM0LS44MTYtMS4yOS0uODE2LTIuMjY3IDAtMS4wMDcuMjUxLTEuNzg1Ljc1NC0yLjMzNC41MDMtLjU1IDEuMTk5LS44MjUgMi4wODctLjgyNS44NDggMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDcyLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MSAwIC43MDMtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45Mi4zMmE1Ljc5IDUuNzkgMCAwIDEtMS4xOTEuMTA0em03LjI1My02LjIyNmMuMjIyIDAgLjQwNi4wMTYuNTUzLjA0OWwtLjEyNCAxLjUzNmExLjg3NyAxLjg3NyAwIDAgMC0uNDgzLS4wNTRjLS41MjMgMC0uOTMuMTM0LTEuMjIyLjQwMy0uMjkyLjI2OC0uNDM4LjY0NC0uNDM4IDEuMTI4VjI0aC-xLjYzOHYtNi4wMDVoMS4yIGwuMjQyIDEuMDFoLjA4Yy4xODctLjMzNy40MzktLjYwOC43NTYtLjgxNGExLjg2IDEuODYgMCAwIDEgMS4wMzQtLjMwOXptNC4wMjkgMS4xNjZjLS4zNDcgMC0uNjIuMTEtLjgxNy4zMy0uMTk3LjIyLS4zMS41MzMtLjMzOC45MzdoMi4yOTljLS4wMDctLjQwNC0uMTEzLS43MTctLjMxNy0uOTM3LS4yMDQtLjIyLS40OC0uMzMtLjgyNy0uMzN6bS4yMyA1LjA2Yy0uOTY2IDAtMS43MjItLjI2Ny0yLjI2Ni0uOC0uNTQ0LS41MzQtLjgxNi0xLjI5LS44MTYtMi4yNjcgMC0xLjAwNy4yNTEtMS43ODUuNzU0LTIuMzM0Lj5MDQtLjU1IDEuMi04MjUgMi4wODctLjgyNS44NDkgMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDczLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MiAwIC43MDQtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45MTkuMzJhNS43OSA1Ljc5IDAgMCAxLTEuMTkyLjEwNHptNS44MDMgMGMtLjcwNiAwLTEuMjYtLjI3NS0xLjY2My0uODIyLS40MDMtLjU0OC0uNjA0LTEuMzA3LS42MDQtMi4yNzggMC0uOTg0LjIwNS0xLjc1Mi42MTUtMi4zMDEuNDEtLjU1Ljk3NS0uODI1IDEuNjk1LS48MjUuNzU1IDAgMS4zMzIuMjk0IDEuNzI5Ljg4MWguMDU0YTYuNjk3IDYuNjk3IDAgMCAxLS4xMjQtMS4xOTh2LTEuOTIyaDEuNjQ0VjI0SDQ2LjQzbC0uMzE3LS43NzloLS4wN2MtLjM3Mi41OTEtLjk0Ljg4Ni0xLjcwMi44ODZ6bS41NzQtMS4zMDZjLjQyIDAgLjcyNi0uMTIxLjkyMS0uMzY1LjE5Ni0uMjQzLjMwMi0uNjU3LjI5OC0xLjI0di0uMTc4YzAtLjY0NC0uMS0xLjEwNi0uMjk4LTEuMzg2LS4xOTktLjI3OS0uNTIyLS45Ny0uOTktLjQxOWEuOTYyLjk2MiAwIDAgMC0uODUuNDY1Yy0uMjAzLjMxLS4zMDQuNzYtLjMwNCAxLjM1IDAgLjU5Mi4xMDIgMS4wMzUuMzA2IDEuMzMuMjA0LjI5Ni40OTYuNDM0Ljg3NS40NDN6bTEwLjkyMi00LjkyYy43MDkgMCAxLjI2NC4yNzcgMS42NjUuODMuNC41NTMuNjAxIDEuMzEyLjYwMSAyLjI3NSAwIC45OTItLjIwNiAxLjc2LS42MiAyLjMwNC0uNDE0LjU0NC0uOTc3LjgxNi0xLjY5LjgxNi0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY1OS0uNzY4aC0uMTEzbC0uMjc0LjY2MWgtMS4yNTF2LTguMzU3aDEuNjM4djEuOTQ0YzAgLjI0Ny0uMDIxLjY0My0uMDY0IDEuMTg3aC4wNjRjLjM4My0uNTk0Ljk1LS44OTIgMS43MDMtLjg5MnptLS41MjcgMS4zMWMtLjQwNCAwLS43LjIwOS0uODg2Lj3NC0uMTg2LjI0OS0uMjgzLjY2LS4yOSAxLjIzM3YuMTc3YzAgLjY0NS4wOTYgMS4xMDcuMjg3IDEuMzg2LjE5Mi4yOC40OTUuNDE5LjkxLjQxOS4zMzcgMCAuNjA1LS4xNTUuODA0LS40NjUuMTk5LS4zMS4yOTgtLjc2LjI5OC0xLjM1IDAtLjU5MS0uMS0xLjAzNS0uMy0xLjMzYS45NDMuOTQzIDAgMCAwLS44MjMtLjQ0M3ptMy4xODYtMS4xOTdoMS43OTRsMS4xMzQgMy4zNzljLjA5Ni4yOTMuMTYzLjY0LjE5OCAxLjA0MmguMDMzYy4wMzktLjM3LjExNi0uNzE3LjIzLS4wNDJsMS4xMTItMy4zNzloMS43NTZsLTIuNTQgNi43NzNjLS4yMzQuNjI3LS41NjYgMS4wOTYtLjk5NyAxLjQwNy0uNDMyLjMxMi0uOTM2LjQ2OC0xLjUxMi40NjgtLjI4MyAwLS41Ni0uMDMtLjgzMy0uMDkydi0xLjNhMi44IDI4IDAgMCAwIC42NDUuMDdjLjI5IDAgLjU0My0uMDg4Ljc2LS4yNjYuMjE3LS4xNzcuMzg2LS40NDQuNTA4LS44MDNsLjA5Ni0uMjk1LTIuMzg1LTUuOTYyeiIvPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNmb3JtKzczKSI+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjE5IiBjeT0iMTkiIHI9IjE5IiBmaWxsPSIjRDFEMUQxIi8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0yMi40NzQgMTUuNDQzaDUuMTYyTDEyLjQzNiAzMC40VjEwLjM2M2gxNS4ybC01LjE2MiA1LjA4eiIvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBmaWxsPSIjRDFEMUQxIiBkPSJNMTIxLjQ0NCAxNC41NnYtMS43MjhoOC4yNzJ2MS43MjhoLTMuMDI0VjI0aC0yLjI0di05LjQ0aC0zLjAwOHptMTMuNzQ0IDkuNTY4Yy0xLjI5IDAtMi4zNDEtLjQxOS0zLjE1Mi0xLjI1Ni0uODEtLjgzNy0xLjIxNi0xLjk0NC0xLjIxNi0zLjMycy40MDgtMi40NzcgMS4yMjQtMy4zMDRjLjgxNi0uODI3IDEuODcyLTEuMjQgMy4xNjgtMS4yNHMyLjM2LjQwMyAzLjE5MiAxLjIwOGMuODMyLjgwNSAxLjI0OCAxLjg4IDEuMjQ4IDMuMjI0IDAgLjMxLS4wMjEuNTk3LS4wNjQuODY0aC02LjQ2NGMuMDUzLjU3Ni4yNjcgMS4wNC42NCAxLjM5Mi4zNzMuMzUyLjg0OC41MjggMS40MjQuNTI4Ljc3OSAwIDEuMzU1LS4zMiAxLjcyOC0uOTZoMi40MzJhMy44OTEgMy44OTEgMCAwIDEtMS40ODggMi4wNjRjLS43MzYuNTMzLTEuNjI3LjgtMi42NzIuOHptMS40OC02LjY4OGMtLjQtLjM1Mi0uODgzLS41MjgtMS40NDgtLjUyOHMtMS4wMzcuMTc2LTEuNDFlLjUyOGMtLjM3OS4zNTItLjYwNS44MjEtLjY4IDEuNDA4aDQuMTkyYy0uMDMyLS41ODctLjI0OC0xLjA1Ni0uNjQ4LTEuNDA4em03LjAxNi0yLjUwNHYxLjU2OGMuNTk3LTEuMTMgMS40NjEtMS42OTYgMi41OTItMS42OTZ2Mi4zMDRoLS41NmMtLjY3MiAwLTEuMTc5LjE2OC0xLjUyLy41MDQtLjM0MS4zMzYtLjUxMi45MTUtLjUxMiAxLjczNlYyNGgtMi4yNTZ2LTguODY0aDIuMjU2em02LjQ0OCAwdjEuMzI4Yy41NjUtLjk3IDEuNDgzLTEuNDU2Mi43NTItMS40NTYuNjcyIDAgMS4yNzIuMTU1IDEuOC40NjQuNTI4LjMxLjkzNi43NTIgMS4yMjQgMS4zMjguMzEtLjU1NS43MzMtLjk5MiAxLjI3Mi0xLjMxMmEzLjQ4OCAzLjQ4OCAwIDAgMSAxLjgxNi0uNDhjMS4wNTYgMCAxLjkwNy4zMyAyLjU1Mi45OTIuNjQ1LjY2MS45NjggMS45OS45NjggMi43ODRWMjRoLTIuMjR2LTQuODk2YzAtLjY5My0uMTc2LTEuMjI0LS41MjgtMS41OTItLjM1Mi0uMzY4LS44MzItLjU1Mi0xLjQ0LS41NTJzLTEuMDkuMTg0LTEuNDQ4LjU1MmMtLjM1Ny4zNjgtLjUzNi44OTktLjUzNiAxLjU5MlYyNGgtMi4yNHYtNC44OTZjMC0uNjkzLS4xNzYtMS4yMjQtLjUzNi0xLjU5Mi0uMzUyLS4zNjgtLjgzMi0uNTUyLTEuNDQtLjU1MnMtMS4wOS4xODQtMS40NDguNTUyYy0uMzU3LjM2OC0uNTM2Ljg5OS0uNTM2IDEuNTkyVjI0aC0yLjI1NnYtOC44NjRoMi4yNTZ6TTE2NC45MzYgMjRWMTIuMTZoMi4yNTZWMjRoLTIuMjU2em03LjA0LS4xNmwtMy40NzItOC43MDRoMi41MjhsMi4yNTYgNi4zMDQgMi4zODQtNi4zMDRoMi4zNTJsLTUuNTM2IDEzLjA1NmgtMi4zNTJsMS44NC00LjM1MnoiLz4KICAgIDwvZz4KPC9zdmc+) center no-repeat' 
          }}
        />

        {/* Legal content wrapper */}
        <div data-custom-class="body" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body), Arial, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
          
          <div>
            <strong>
              <span style={{ fontSize: '26px' }}>
                <span data-custom-class="title">
                  <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px', color: 'var(--color-primary)' }}>TERMS OF SERVICE</h1>
                </span>
              </span>
            </strong>
          </div>
          
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>
              <strong>
                <span style={{ fontSize: '15px' }}>
                  <span data-custom-class="subtitle">Ziggers Platform</span>
                </span>
              </strong>
            </span>
          </div>

          <div style={{ marginTop: '8px', marginBottom: '32px' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              <span data-custom-class="subtitle" style={{ fontWeight: 'normal' }}>
                Last Updated: May 29, 2026 &nbsp;|&nbsp; Effective Date: May 29, 2026
              </span>
            </span>
          </div>

          {/* TABLE OF CONTENTS */}
          <div id="toc" data-custom-class="heading_1" style={{ borderTop: '1px solid rgba(41,33,27,0.1)', paddingTop: '24px' }}>
            <h2>TABLE OF CONTENTS</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            <a data-custom-class="link" href="#acceptance">1. ACCEPTANCE OF TERMS</a>
            <a data-custom-class="link" href="#description">2. DESCRIPTION OF SERVICES</a>
            <a data-custom-class="link" href="#eligibility">3. ELIGIBILITY</a>
            <a data-custom-class="link" href="#accounts">4. USER ACCOUNTS</a>
            <a data-custom-class="link" href="#obligations">5. USER OBLIGATIONS</a>
            <a data-custom-class="link" href="#payments">6. PAYMENTS AND FEES</a>
            <a data-custom-class="link" href="#gps">7. GPS TRACKING AND LOCATION DATA</a>
            <a data-custom-class="link" href="#ratings">8. RATINGS AND REVIEWS</a>
            <a data-custom-class="link" href="#prohibited">9. PROHIBITED CONDUCT</a>
            <a data-custom-class="link" href="#ip">10. INTELLECTUAL PROPERTY</a>
            <a data-custom-class="link" href="#thirdparty">11. THIRD-PARTY SERVICES AND LINKS</a>
            <a data-custom-class="link" href="#liability">12. DISCLAIMERS AND LIMITATION OF LIABILITY</a>
            <a data-custom-class="link" href="#indemnification">13. INDEMNIFICATION</a>
            <a data-custom-class="link" href="#governinglaw">14. GOVERNING LAW AND DISPUTE RESOLUTION</a>
            <a data-custom-class="link" href="#privacy">15. PRIVACY</a>
            <a data-custom-class="link" href="#changes">16. CHANGES TO THE SERVICES</a>
            <a data-custom-class="link" href="#severability">17. SEVERABILITY AND ENTIRE AGREEMENT</a>
            <a data-custom-class="link" href="#contact">18. CONTACT US</a>
          </div>

          {/* SECTION 1 */}
          <div id="acceptance" data-custom-class="heading_1" style={{ borderTop: '1px solid rgba(41,33,27,0.1)', paddingTop: '24px' }}>
            <h2>1. ACCEPTANCE OF TERMS</h2>
          </div>
          <p data-custom-class="body_text">
            Welcome to Ziggers, a mobile platform operated by Unfounded.in ('Company', 'we', 'us', or 'our'). By downloading, accessing, or using the Ziggers application or any related services (collectively, 'Services'), you ('User', 'you') agree to be bound by these Terms of Service ('Terms').
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px' }}>
            If you do not agree to these Terms, you must not access or use our Services. These Terms constitute a legally binding agreement between you and Ziggers/Unfounded.in.
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px' }}>
            We reserve the right to update these Terms at any time. Continued use of the Services after any changes constitutes your acceptance of the revised Terms. We will notify you of material changes via the app or via email.
          </p>

          {/* SECTION 2 */}
          <div id="description" data-custom-class="heading_1">
            <h2>2. DESCRIPTION OF SERVICES</h2>
          </div>
          <p data-custom-class="body_text">
            Ziggers is a mobile platform designed to connect employers ('Job Posters') with workers ('Gig Workers') for short-term, informal jobs in India ('ZIG Jobs'). These include, but are not limited to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Catering staff and food service workers</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Event helpers and coordinators</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Pamphlet and promotional material distributors</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Stall workers and exhibition staff</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Cleaning and janitorial staff</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Other day-wage or short-term labour roles</li>
          </ul>
          <p data-custom-class="body_text">
            The platform provides features including:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Structured job posting with clear details (location, timing, pay, dress code)</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Discovery of local, available workers for posted gigs</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Prepaid, escrow-protected payment processing</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Live GPS tracking of workers once on-site</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Proof-based job completion verification</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Performance ratings and reputation scoring</li>
          </ul>
          <p data-custom-class="body_text">
            Ziggers acts solely as a technology platform facilitating connections between Job Posters and Gig Workers. We are not an employer, staffing agency, or labour contractor, and do not employ any Gig Workers using our platform.
          </p>

          {/* SECTION 3 */}
          <div id="eligibility" data-custom-class="heading_1">
            <h2>3. ELIGIBILITY</h2>
          </div>
          <p data-custom-class="body_text">
            To use the Ziggers platform, you must:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Be at least 18 years of age</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Be legally capable of entering into a binding contract under applicable Indian law</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Possess a valid mobile phone number registered in India</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not be barred from receiving services under applicable law</li>
          </ul>
          <p data-custom-class="body_text">
            By using the Services, you represent and warrant that you meet all eligibility requirements. Ziggers reserves the right to refuse service to anyone for any reason at any time, to the extent permitted by applicable law.
          </p>

          {/* SECTION 4 */}
          <div id="accounts" data-custom-class="heading_1">
            <h2>4. USER ACCOUNTS</h2>
          </div>
          
          <div data-custom-class="heading_2">
            <h3>4.1 Account Registration</h3>
          </div>
          <p data-custom-class="body_text">
            To access the Services, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated at all times.
          </p>

          <div data-custom-class="heading_2">
            <h3>4.2 Account Security</h3>
          </div>
          <p data-custom-class="body_text">
            You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not share your login credentials with any third party</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Notify us immediately at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a> if you suspect any unauthorised access to your account</li>
          </ul>
          <p data-custom-class="body_text">
            Ziggers is not liable for any loss or damage arising from your failure to maintain adequate account security.
          </p>

          <div data-custom-class="heading_2">
            <h3>4.3 Account Termination</h3>
          </div>
          <p data-custom-class="body_text">
            We reserve the right to suspend or terminate your account at any time, with or without notice, if we reasonably believe you have violated these Terms or applicable law. You may also terminate your account at any time by contacting us at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>.
          </p>

          {/* SECTION 5 */}
          <div id="obligations" data-custom-class="heading_1">
            <h2>5. USER OBLIGATIONS</h2>
          </div>
          
          <div data-custom-class="heading_2">
            <h3>5.1 All Users</h3>
          </div>
          <p data-custom-class="body_text">
            All users of the platform agree to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Provide truthful, accurate, and up-to-date information on their profile and in all interactions</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Comply with all applicable Indian laws and regulations</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not use the platform for any illegal, fraudulent, or harmful purpose</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Treat all other users with respect and dignity</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not engage in harassment, discrimination, or abusive behaviour</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not post or transmit any content that is defamatory, obscene, or otherwise objectionable</li>
          </ul>

          <div data-custom-class="heading_2">
            <h3>5.2 Job Posters (Employers)</h3>
          </div>
          <p data-custom-class="body_text">
            As a Job Poster, you additionally agree to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Post only genuine, lawful job opportunities</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Provide complete and accurate job details including location, timing, required work, dress code, and pay</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Pre-fund payments into the Ziggers escrow system before a job begins</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not require Gig Workers to perform tasks outside the scope of the posted job</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Comply with applicable Indian labour laws and regulations</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not discriminate against workers on the basis of religion, caste, gender, age, disability, or any other protected characteristic</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Provide a safe working environment for all workers engaged through the platform</li>
          </ul>

          <div data-custom-class="heading_2">
            <h3>5.3 Gig Workers</h3>
          </div>
          <p data-custom-class="body_text">
            As a Gig Worker, you additionally agree to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Provide accurate information about your identity, skills, and availability</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Accept only jobs you are genuinely available and qualified to complete</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Arrive at the designated location on time and perform the agreed work professionally</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Submit accurate and genuine proof of job completion as required by the platform</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Not misrepresent your location using GPS spoofing or other fraudulent means</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Comply with the dress code and conduct standards specified by the Job Poster</li>
          </ul>

          {/* SECTION 6 */}
          <div id="payments" data-custom-class="heading_1">
            <h2>6. PAYMENTS AND FEES</h2>
          </div>
          
          <div data-custom-class="heading_2">
            <h3>6.1 Payment System</h3>
          </div>
          <p data-custom-class="body_text">
            Ziggers uses a prepaid, escrow-based payment model to protect all parties. Job Posters must deposit the full payment amount into the Ziggers escrow system before a gig begins. Funds are released to the Gig Worker upon verified completion of the job.
          </p>

          <div data-custom-class="heading_2">
            <h3>6.2 Payment Processing</h3>
          </div>
          <p data-custom-class="body_text">
            All payments on the platform are processed through ZOHO PAY. By using the payment features, you also agree to ZOHO PAY's terms and privacy policy, available at <a href="https://www.zoho.com/in/payments/privacy.html" target="_blank" data-custom-class="link" rel="noreferrer">https://www.zoho.com/in/payments/privacy.html</a>. Ziggers does not store your full payment card details.
          </p>

          <div data-custom-class="heading_2">
            <h3>6.3 Platform Fees</h3>
          </div>
          <p data-custom-class="body_text">
            Ziggers may charge service fees to Job Posters and/or Gig Workers for the use of the platform. Any applicable fees will be clearly disclosed before you confirm a transaction. We reserve the right to modify our fee structure with prior notice to users.
          </p>

          <div data-custom-class="heading_2">
            <h3>6.4 Disputes and Refunds</h3>
          </div>
          <p data-custom-class="body_text">
            In the event of a payment dispute:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Ziggers will review submitted job completion evidence from the Gig Worker</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Job Posters may raise a dispute within 24 hours of the reported job completion</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Ziggers will act as a neutral facilitator and its decision shall be final and binding</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Refunds, if approved, will be processed within 7-10 business days</li>
          </ul>
          <p data-custom-class="body_text">
            Ziggers is not responsible for disputes arising from misrepresentations made by either party outside the platform.
          </p>

          <div data-custom-class="heading_2">
            <h3>6.5 Taxes</h3>
          </div>
          <p data-custom-class="body_text">
            You are solely responsible for determining and fulfilling any tax obligations arising from your use of the platform, including income tax, GST, or any other applicable taxes under Indian law.
          </p>

          {/* SECTION 7 */}
          <div id="gps" data-custom-class="heading_1">
            <h2>7. GPS TRACKING AND LOCATION DATA</h2>
          </div>
          <p data-custom-class="body_text">
            The platform uses GPS and location-tracking features to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Allow Job Posters to verify that Gig Workers have arrived at the designated work location</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Enable live tracking of workers during active gig assignments</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Facilitate accurate geolocation-based job matching</li>
          </ul>
          <p data-custom-class="body_text">
            By accepting a gig or posting a job requiring location verification, you consent to the collection and use of your real-time location data for the duration of the gig. Location data is used as described in our Privacy Policy at <a href="https://ziggers.in/privacy" target="_blank" data-custom-class="link" rel="noreferrer">https://ziggers.in/privacy</a>.
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px' }}>
            Gig Workers must not use GPS spoofing, VPNs, or any other method to falsify their location. Doing so constitutes a material breach of these Terms and may result in immediate account termination and forfeiture of earned payments.
          </p>

          {/* SECTION 8 */}
          <div id="ratings" data-custom-class="heading_1">
            <h2>8. RATINGS AND REVIEWS</h2>
          </div>
          <p data-custom-class="body_text">
            Both Job Posters and Gig Workers may rate and review one another following the completion of a gig. You agree that:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>All ratings and reviews must be honest and based on genuine experience</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>You will not submit false, misleading, or retaliatory ratings</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>You will not offer or accept incentives in exchange for positive reviews</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Ziggers reserves the right to remove reviews that violate these Terms</li>
          </ul>
          <p data-custom-class="body_text">
            Ratings and reviews form the reputation system of the platform and directly affect a user's visibility and access to gigs. Ziggers makes no warranty as to the accuracy or reliability of any rating or review posted by users.
          </p>

          {/* SECTION 9 */}
          <div id="prohibited" data-custom-class="heading_1">
            <h2>9. PROHIBITED CONDUCT</h2>
          </div>
          <p data-custom-class="body_text">
            You agree NOT to use the Services to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Violate any applicable local, state, national, or international law or regulation</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Post fake, fraudulent, or misleading job listings</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Solicit or accept payments outside of the Ziggers payment system</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Harass, threaten, or intimidate any other user</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Collect or harvest personal information about other users without their consent</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Reverse-engineer, decompile, or attempt to extract the source code of the application</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Use bots, scrapers, or automated tools to access the platform</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Create multiple accounts or impersonate any person or entity</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Circumvent or attempt to circumvent any platform security feature</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Upload or transmit malware, viruses, or any other harmful code</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Use the platform for activities other than legitimate job transactions</li>
          </ul>
          <p data-custom-class="body_text">
            Violation of this section may result in immediate account suspension, termination, and where appropriate, referral to law enforcement authorities.
          </p>

          {/* SECTION 10 */}
          <div id="ip" data-custom-class="heading_1">
            <h2>10. INTELLECTUAL PROPERTY</h2>
          </div>
          <p data-custom-class="body_text">
            All content, features, and functionality of the Ziggers platform, including but not limited to text, graphics, logos, icons, software, and the overall design, are the exclusive property of Unfounded.in and are protected by applicable Indian and international intellectual property laws.
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px' }}>
            You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Services for their intended purpose. This licence does not include the right to:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Resell or commercially exploit any part of the Services</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Copy, reproduce, or distribute platform content without express written permission</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Create derivative works based on the platform</li>
          </ul>
          <p data-custom-class="body_text">
            Any feedback, suggestions, or ideas you provide to us about the Services may be used by Ziggers without any obligation to compensate you.
          </p>

          {/* SECTION 11 */}
          <div id="thirdparty" data-custom-class="heading_1">
            <h2>11. THIRD-PARTY SERVICES AND LINKS</h2>
          </div>
          <p data-custom-class="body_text">
            The Services may integrate with or contain links to third-party services (such as ZOHO PAY, Google Maps, Auth0, and others). These third-party services are governed by their own terms and privacy policies, and Ziggers has no control over and assumes no responsibility for their content, practices, or availability.
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px' }}>
            Your use of third-party services is at your own risk and is subject to the applicable third-party terms.
          </p>

          {/* SECTION 12 */}
          <div id="liability" data-custom-class="heading_1">
            <h2>12. DISCLAIMERS AND LIMITATION OF LIABILITY</h2>
          </div>
          
          <div data-custom-class="heading_2">
            <h3>12.1 Platform Role</h3>
          </div>
          <p data-custom-class="body_text">
            Ziggers is a technology platform only. We do not verify the identity, qualifications, background, or suitability of any Gig Worker or Job Poster beyond what is required for platform registration. We do not guarantee that any job will be completed to satisfaction or that any worker will meet the expectations of a Job Poster.
          </p>

          <div data-custom-class="heading_2">
            <h3>12.2 No Employment Relationship</h3>
          </div>
          <p data-custom-class="body_text">
            Nothing in these Terms creates an employment, agency, partnership, or joint venture relationship between Ziggers and any Gig Worker or Job Poster. Gig Workers are independent contractors and Ziggers is not their employer for any purpose, including but not limited to tax, social security, or labour law purposes.
          </p>

          <div data-custom-class="heading_2">
            <h3>12.3 Disclaimer of Warranties</h3>
          </div>
          <p data-custom-class="body_text" style={{ textTransform: 'uppercase' }}>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. ZIGGERS DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>

          <div data-custom-class="heading_2">
            <h3>12.4 Limitation of Liability</h3>
          </div>
          <p data-custom-class="body_text" style={{ textTransform: 'uppercase' }}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ZIGGERS AND UNFOUNDED.IN SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES.
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px', textTransform: 'uppercase' }}>
            IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU HAVE PAID TO ZIGGERS IN THE SIX (6) MONTHS PRECEDING THE CLAIM.
          </p>

          {/* SECTION 13 */}
          <div id="indemnification" data-custom-class="heading_1">
            <h2>13. INDEMNIFICATION</h2>
          </div>
          <p data-custom-class="body_text">
            You agree to indemnify, defend, and hold harmless Ziggers, Unfounded.in, and their respective officers, directors, employees, agents, and successors from and against any and all claims, damages, liabilities, costs, and expenses (including reasonable legal fees) arising from:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Your use of or inability to use the Services</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Your violation of these Terms</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Your violation of any applicable law or third-party rights</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Any content you submit, post, or transmit through the platform</li>
            <li data-custom-class="body_text" style={{ marginBottom: '4px' }}>Any dispute between you and another user of the platform</li>
          </ul>

          {/* SECTION 14 */}
          <div id="governinglaw" data-custom-class="heading_1">
            <h2>14. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
          </div>
          
          <div data-custom-class="heading_2">
            <h3>14.1 Governing Law</h3>
          </div>
          <p data-custom-class="body_text">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>

          <div data-custom-class="heading_2">
            <h3>14.2 Jurisdiction</h3>
          </div>
          <p data-custom-class="body_text">
            Any disputes arising out of or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.
          </p>

          <div data-custom-class="heading_2">
            <h3>14.3 Informal Resolution</h3>
          </div>
          <p data-custom-class="body_text">
            Before initiating any legal proceedings, you agree to first attempt to resolve any dispute informally by contacting us at <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>. We will attempt to resolve the dispute within 30 days of receiving written notice.
          </p>

          {/* SECTION 15 */}
          <div id="privacy" data-custom-class="heading_1">
            <h2>15. PRIVACY</h2>
          </div>
          <p data-custom-class="body_text">
            Your use of the Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you consent to the collection, use, and sharing of your personal information as described in the Privacy Policy available at <a href="https://ziggers.in/privacy" target="_blank" data-custom-class="link" rel="noreferrer">https://ziggers.in/privacy</a>.
          </p>

          {/* SECTION 16 */}
          <div id="changes" data-custom-class="heading_1">
            <h2>16. CHANGES TO THE SERVICES</h2>
          </div>
          <p data-custom-class="body_text">
            Ziggers reserves the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.
          </p>

          {/* SECTION 17 */}
          <div id="severability" data-custom-class="heading_1">
            <h2>17. SEVERABILITY AND ENTIRE AGREEMENT</h2>
          </div>
          <p data-custom-class="body_text">
            If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect.
          </p>
          <p data-custom-class="body_text" style={{ marginTop: '12px' }}>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Ziggers regarding the Services and supersede any prior agreements or understandings.
          </p>

          {/* SECTION 18 */}
          <div id="contact" data-custom-class="heading_1">
            <h2>18. CONTACT US</h2>
          </div>
          <p data-custom-class="body_text">
            If you have any questions, concerns, or complaints about these Terms or our Services, please contact us:
          </p>
          
          <div style={{ 
            marginTop: '16px', 
            padding: '24px', 
            backgroundColor: 'var(--color-surface)', 
            borderRadius: '16px', 
            color: 'var(--color-primary)',
            fontWeight: '600'
          }}>
            <p data-custom-class="body_text" style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-primary) !important' }}>Ziggers / Unfounded.in</p>
            <p data-custom-class="body_text" style={{ margin: '4px 0 0', color: 'var(--color-text-muted) !important' }}>No. 1 Shanthinikenthan Colony Extension, Madambakkam</p>
            <p data-custom-class="body_text" style={{ margin: '2px 0 0', color: 'var(--color-text-muted) !important' }}>Chennai, Tamil Nadu – 600126, India</p>
            <p data-custom-class="body_text" style={{ margin: '8px 0 0', color: 'var(--color-text-muted) !important' }}>
              Email: <a href="mailto:hello@unfounded.in" data-custom-class="link">hello@unfounded.in</a>
            </p>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid rgba(41,33,27,0.1)', paddingTop: '20px', textAlign: 'center' }}>
            <p data-custom-class="body_text" style={{ fontSize: '12px' }}>
              © 2026 Unfounded.in. All rights reserved. This document was last updated on May 29, 2026.
            </p>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}
