import React, {useEffect} from 'react';


const random_rgba = () => {
    const r1 = Math.round, r2 = Math.random;
    const r =  r1(r2()*255), g = r1(r2()*255), b = r1(r2()*255);
    const ratio = Math.round((r * 299 + g * 587 + b * 114) /1000);

    return () => ({
            background: 'rgba(' + r + ',' + g + ',' + b + ', 1)',
            foreground:  ratio > 125 ? 'black' :  'white'
        });
}

let colors = random_rgba();


function Avatar({user}) {
    
    useEffect(() => {
        colors = random_rgba();
    }
     // eslint-disable-next-line
    );

    const round = {
        borderStyle: 'none',
        borderWidth: '1px',
        color: colors().foreground,
        padding: '5px',
        borderRadius: '50%',
        background: colors().background,
        fontWeight: 'bold',
        marginLeft: '5px'
    };

    const initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    return (
        <span style={round}>{initials}</span>
    );

}

export default Avatar;