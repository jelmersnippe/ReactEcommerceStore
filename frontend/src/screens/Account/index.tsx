import {FunctionComponent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../config/store';
import './styles.scss';
import api from '../../config/api';
import {resetUser, setUser} from '../../reducers/user/actions';
import {setCart} from '../../reducers/cart/actions';

const Account: FunctionComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const login = async (email: string, password: string) => {
        if (email === '' || password === '') {
            return;
        }
        api.app.login({email, password})
            .then((response) => {
                const data = response.data;
                dispatch(setUser({
                    accessToken: data.accessToken,
                    id: data.userId,
                    name: data.name
                }));
                dispatch(setCart(data.cart))
            })
    }

    const signup = async (email: string, firstName: string, lastName: string, password: string) => {
        if (email === '' || password === '' || firstName === '' || lastName === '') {
            return;
        }
        await api.user.create({email, firstName, lastName, password})
            .then(() => login(email, password));
    }

    return (
        <div>
            {
                user.accessToken ?
                    <div className="login form">
                        <h2>Welkom {user.name}</h2>
                        <button onClick={() => dispatch(resetUser())}>Uitloggen</button>
                    </div>
                    :
                    <div className="wrapper">
                        <div className="login form">
                            <h2>Login</h2>
                            <input placeholder={'Email'} type="email" className="email" onChange={(event) => setEmail(event.target.value)}/>
                            <input placeholder={'Wachtwoord'} type="password" className="password" onChange={(event) => setPassword(event.target.value)}/>
                            <button onClick={() => login(email, password)}>Inloggen</button>
                        </div>
                        <div className="signup form">
                            <h2>Registreer</h2>
                            <input placeholder={'Email'} type="email" onChange={(event) => setEmail(event.target.value)}/>
                            <input placeholder={'Voornaam'} type="text" onChange={(event) => setFirstName(event.target.value)}/>
                            <input placeholder={'Achternaam'} type="text" onChange={(event) => setLastName(event.target.value)}/>
                            <input placeholder={'Wachtwoord'} type="password" onChange={(event) => setPassword(event.target.value)}/>
                            <button onClick={() => signup(email, firstName, lastName, password)}>Registreren</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Account;
