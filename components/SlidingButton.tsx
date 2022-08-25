import styled from "styled-components";

const Button = styled.button`
    cursor: default;
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
    text-align: center;
    border-width: 7px;
    border-radius: 1rem;
    max-width: 250px;
    padding: 0.75rem;
    width: 250px;
    height: 75px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    color: ${props => props.color};
    border-color: ${props => props.color};

    background: -webkit-linear-gradient(0deg, transparent 50%, ${props => props.color} 50%);
    background: -webkit-linear-gradient(transparent 50%, ${props => props.color} 50%);
    // background-size: 500px 100%;
    // top-bottom
    background-size: 250px 150px;
    transition: 0.6s;

    &:hover {
        // left
        // background-position: 250px 0;
        // top
        background-position: 0 75px;

        color: white;
        transform: scale(1.1);

    }

    &:active {
        transform: scale(0.95);
        -webkit-transition: transform 0.05s ease-in-out;
    }
`

const Label = styled.p`
    font-size: 1.25rem;
    line-height: 1.75rem;
`

function SlidingButton(props : any)
{


    return <Button onClick={props.onClick} color={props.color}>
                <Label>
                    {props.children}
                </Label>
            </Button>
}

export default SlidingButton;
