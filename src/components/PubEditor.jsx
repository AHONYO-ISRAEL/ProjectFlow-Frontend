import {Editor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
    toolbar: [ 'bold', 'italic' ]
};

const PubEditor = ()=>{

        return (
            <div className="App">
                <h2>Using CKEditor 5 from online builder in React</h2>
                <CKEditor
                    editor={ Editor }
                    config={ editorConfiguration }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }


export default PubEditor;
