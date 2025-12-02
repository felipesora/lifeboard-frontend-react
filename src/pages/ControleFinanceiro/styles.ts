import styled from "styled-components";

export const DashBoardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: stretch;
    @media (max-width: 1260px) {
        display: initial;
    }
`;

export const DashBoardMain = styled.main`
    flex: 1;
    padding: 40px;
    background-color: #ECEFF1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .titulo {
        p {
            font-size: 16px;
            font-weight: 700;
            @media (max-width: 760px) {
                font-size: 15px;
            }
        }
    }
    @media (max-width: 1810px) {
        padding: 40px 30px;
    }
    @media (max-width: 1260px) {
        padding: 30px 0 50px 50px;
    
    }
    @media (max-width: 1150px) {
        padding: 30px 0 50px 30px;
    }
    @media (max-width: 970px) {
        padding: 30px 0 50px 20px;
    }
    @media (max-width: 810px) {
        padding: 30px 0 50px 10px;
    }
    @media (max-width: 675px) {
        padding: 30px 0 50px 0px;
    }
`;