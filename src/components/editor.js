import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({socketRef, roomId, onCodeChange}) => {

    const editorRef = useRef(null);

    useEffect(() => {
        async function init() {

            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'blackboard',
                    autoCloseTags: true,
                    autoCloseBrackets: true, //close brackets apne aap enaple ho jayege code editor me
                    lineNumbers: true, //side me counting
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                //console.log('change',changes)
                 const { origin } = changes;
                 const code = instance.getValue();
                //console.log(code);
                onCodeChange(code);
                if (origin !== 'setValue') {
                    //console.log('working',code)
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                 }
                //  console.log(code);
            });
        }
        init();
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                // console.log('recieving',code)
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);
        
 

    return (
        <textarea id="realtimeEditor"></textarea>
    )
    
};

export default Editor;