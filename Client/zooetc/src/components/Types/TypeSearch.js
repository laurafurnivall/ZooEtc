import React, { useState, useEffect } from 'react';

export default function TypeSearch({ setterFunction }) {
    return (
        <>
        <div>
            <input className="search" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
                type="text" placeholder="Search for a specific type of gear..." />
        </div>
      </>
    )
}