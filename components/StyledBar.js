import styled from 'styled-components';
import React, {useEffect} from 'react'

const StyledDiv = styled.div`
    width: 100%;
    padding: 0.4rem;
    border-radius: 0.75rem;
    background: linear-gradient(to right, ${props => props.colors[0]} 0%, ${props => props.colors[0]} ${props => props.percentages[0]}, ${props => props.colors[1]} ${props => props.percentages[0]}, ${props => props.colors[1]} ${props => props.percentages[1]}, ${props => props.colors[2]} ${props => props.percentages[1]}, ${props => props.colors[2]} 100%);
`

function StyledBar(props)
{
    // props:
    // colors: [3]
    // percentages: [2]
    return <StyledDiv colors={props.colors} percentages={props.percentages}/>;
}

export default StyledBar;