import React from 'react';

function Root() {
    document.getElementById('auth').innerHTML = '';
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Content</div>

                            <div className="card-body">Body</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Root;
