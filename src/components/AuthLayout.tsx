import styled from 'styled-components'
export interface LayoutProps  { 
    children: React.ReactNode
 }
const AuthLayout = (props: LayoutProps) => {
    
  return (
    <Wrapper>
      <div className="left">
        <div className="logo">
            <img src="/image/mscorpreslogo.jpeg" alt="" />
        </div>
        <div className="graphic">
            <img src="/image/graphic.png" alt="" />
        </div>
      </div>
      <div className="right">
        {props.children}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    .left{
        display: flex;
        flex-direction: column;
        gap: 50px;
        justify-content: center;
        align-items: center;
        background-color: #04afa9;
        .logo{
            img{
                width: 400px;
            }
        }
        .graphic{
            img{
                width: 500px;
            }
        }
    }
    .right{
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("/image/loginbg.png");
        background-size: cover;
    }
`
export default AuthLayout
