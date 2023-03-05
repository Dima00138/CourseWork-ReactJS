import React from 'react';
import './Loader.css';
import {Paper} from '@mui/material';
import { Triangle } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='login loader'>
            <Paper sx={{textAlign: "center", width: 450, minHeight: 300, borderRadius: 15, padding: "55px", paddingTop: "100px"}}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Triangle
                    height="250"
                    width="250"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
                </div>

            </Paper>
        </div>
    );
}

export default Loader;
