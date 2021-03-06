/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { OnermForm } from './components/onerm';
import { WilksForm } from './components/wilks';
import { MainIndex } from './components/main';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

/**
 * Application.
 */
class App extends React.Component
{    
    /**
     * Constructor.
     *
     * @param   {object}  props  Form properties.
     *
     * @return  {App}
     */
    constructor(props) 
    {
        super(props);
        
        let s = window.localStorage.getItem('wtcalcs-mainMenuOption') || 'onerm'; 

        this.state = {
            mainMenuOption: s
        };

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Save the state.
     * 
     * @return  {void}
     */
    saveState()
    {
        window.localStorage.setItem('wtcalcs-mainMenuOption', this.state.mainMenuOption);
    }

    /**
     * Handle changes.
     *
     * @param   {object}     event  Form event that triggered change.
     *
     * @return  {void}   
     */
    handleChange(event) 
    {
        this.setState({
            mainMenuOption: event.target.value
        }, () => {
            this.saveState();
        });
    }

    /**
     * Get the appropriate form.
     * 
     * @return  {string}
     */
    getForm()
    {
        if ('onerm' === this.state.mainMenuOption) {
            return <OnermForm />;
        } else {
            return <WilksForm />;
        }
    }

    /**
     * Render the form.
     *
     * @return  {string}   
     */
    render() 
    {
        return(
        <div>
           <BrowserRouter>
                <nav className="menu-top">
                    <input type="checkbox" id="menu-btn" />
                    <label htmlFor="menu-btn"><span className="icon"></span></label>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/onerm">One Rep Maximum</Link>
                        </li>
                        <li>
                            <Link to="/wilks">Wilks Score</Link>
                        </li>
                    </ul>
                </nav>
                 <Routes>
                    <Route path="/" exact element={<MainIndex />} />
                    <Route path="/onerm" element={<OnermForm />} />
                    <Route path="/wilks" element={<WilksForm />} />
                </Routes>
            </BrowserRouter>
        </div>
        );
    }
}
   
// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
  
  