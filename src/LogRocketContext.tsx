import React, {useEffect, useState} from 'react';
import LogRocket from "logrocket";

const LOG_ROCKET_PROJECT_ID = 'ggtile/demoproject1';

interface LogRocketSettings {
    user: {
        email: string;
        recordFrontendLogging: boolean;
        recordFrontendNetworkCalls: boolean;
        recordFrontendUI: boolean;
        associateFrontendLogsWithUser: boolean;
    },
}

const logRocketSettings: LogRocketSettings = {
    user: {
        email: "lumat@op.pl",
        recordFrontendLogging: true,
        recordFrontendNetworkCalls: true,
        recordFrontendUI: false,
        associateFrontendLogsWithUser: true,
    },
}

interface LogRocketContextProps {
    children: React.ReactNode;
}

export function LogRocketContext({ children }: LogRocketContextProps) {
    const [recordUI, setRecordUI] = useState(false);

    useEffect(() => {
        const { user } = logRocketSettings;
        console.log('user', user);
        setRecordUI(user.recordFrontendUI);


        LogRocket.init(LOG_ROCKET_PROJECT_ID);

        if (user && user.associateFrontendLogsWithUser) {
            LogRocket.identify(user.email, {
                // any additional fields
            });
        }
    }, []);

    return recordUI
        ? <div>
            <span>RecordUI: {JSON.stringify(recordUI)}</span>
            {children}
          </div>
        : <div data-private>
            <span>RecordUI: {JSON.stringify(recordUI)}</span>
            {children}
          </div>;
}
