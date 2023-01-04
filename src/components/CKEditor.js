import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
// import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
// import Link from "@ckeditor/ckeditor5-link/src/link";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import Font from "@ckeditor/ckeditor5-font/src/font";
// import Image from "@ckeditor/ckeditor5-image/src/image";
// import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
// import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
// import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
// import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
// import List from "@ckeditor/ckeditor5-list/src/list";
//import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
// import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

export default function Editor() {
    const config = {
        placeholder: '내용을 입력하세요.',
        language: "ko",
        toolbar:[
            'undo',
			'redo',
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'fontFamily',
			'fontColor',
			'fontSize',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'|',
			'alignment',
			'outdent',
			'indent',
			'|',
			'imageInsert',
			'link'
            
        ],
        fontSize: {
            options: [
              14,
              15,
              16,
              17,
              18,
              19,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
            ],
        },
        alignment: {
            options: ["left", "center", "right"],
        },
        image: {
            resizeUnit: "px",
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "imageTextAlternative",
            ],
            styles: ['inline', 'block', 'side'],
            type: ["JPEG", "JPG", "GIF", "PNG"],
        },
    };

    return(
        <CKEditor
                editor={ClassicEditor}
                config={config}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!');
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log('change', data);
                }}
                onBlur={(event, editor) => {
                    //에디터가 아닌 다른곳을 클릭했을 때
                    console.log('Blur');
                }}
                onFocus={(event, editor) => {
                    //에디터를 클릭했을 때
                    console.log('Focus');
                }}
        />
    );
}