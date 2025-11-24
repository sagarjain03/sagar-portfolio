import { dockApps } from '#constants';
import React from 'react'
import { Tooltip } from 'react-tooltip'

const Dock = () => {
    const toggleApp = (app) => {
        if (!app.canOpen) return;
        console.log('toggle app', app.id);
    };

    return (
        <section id="dock">
            <div className="dock-container flex items-end " >
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon transform transition duration-150 ease-linear hover:-translate-y-3 hover:scale-110"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "block" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;
