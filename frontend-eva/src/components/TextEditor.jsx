import { Box,Button,IconButton,Stack } from '@mui/material'
import {Color} from "@tiptap/extension-color"
import ListItem from '@tiptap/extension-list-item'
import TextStyle from "@tiptap/extension-text"
import StarterKit from '@tiptap/starter-kit'
import UnderLine from '@tiptap/extension-underline'
import { useState } from 'react'
import { EditorProvider, useCurrentEditor, useEditor,EditorContent } from '@tiptap/react'
import { FaBold,FaItalic,FaCode, FaStrikethrough,FaHeading,FaListOl,
   FaListUl,FaQuoteLeft,FaRedo,FaUndo,FaCodeBranch,
   FaUnderline
} from "react-icons/fa";

   const MenuBar = ({editor}) => {
       

      if (!editor) {
         return null
      }

      return (
         <Stack direction={'row'} spacing={1} >
            <Button variant = "contained"
               onClick={() => editor.chain().focus().toggleBold().run()}
               disabled={
                  !editor.can()
                     .chain()
                     .focus()
                     .toggleBold()
                     .run()
               }
               className={editor.isActive('bold') ? 'is-active' : ''}
            >
               <FaBold/>
            </Button>
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleItalic().run()}
               disabled={
                  !editor.can()
                     .chain()
                     .focus()
                     .toggleItalic()
                     .run()
               }
               className={editor.isActive('italic') ? 'is-active' : ''}
            >
               <FaItalic/>
            </Button>
            
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleStrike().run()}
               disabled={
                  !editor.can()
                     .chain()
                     .focus()
                     .toggleStrike()
                     .run()
               }
               className={editor.isActive('strike') ? 'is-active' : ''}
            >
               <FaStrikethrough/>
            </Button>
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleCode().run()}
               disabled={
                  !editor.can()
                     .chain()
                     .focus()
                     .toggleCode()
                     .run()
               }
               className={editor.isActive('code') ? 'is-active' : ''}
            >
               <FaCode/>
            </Button>
            {/* <Button
               onClick={() => editor.chain().focus().setParagraph().run()}
               className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
               <FaParagraph/>
            </Button> */}
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
               className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
               <FaHeading/>
            </Button>
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
               <FaListUl/>
            </Button>
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
               <FaListOl />
            </Button>
            {/* <Button
               onClick={() => editor.chain().focus().toggleCodeBlock().run()}
               className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
               <FaCodeBranch/>
            </Button> */}
            <Button variant="contained"
               onClick={() => editor.chain().focus().toggleBlockquote().run()}
               className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
               <FaQuoteLeft/>
            </Button>
            
            
            <Box >
               <Button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={
                     !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                  }
               >
                  <FaUndo/>
               </Button>
               <Button 
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={
                     !editor.can()
                     .chain()
                     .focus()
                     .redo()
                     .run()
                  }
                  >
                  <FaRedo />
               </Button>
               {/* <Button
                  onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                  className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                  >
                  purple
               </button> */}
            </Box>
         </Stack>
      )
   }
function TextEditor({setDescripcion}) {
   const extensions = [
      // Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
         bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
         },
         orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
         },
         
      }),

   ]

   const editor = useEditor({
      extensions:extensions,
      UnderLine,
      onUpdate: ({ editor }) => {
         const html = editor.getHTML();
         console.log(html);
         setDescripcion(html);
      },
   });

  return (
     <Box sx={{borderRadius:'5px', border: '1px solid gray'}}>
        {/* <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider> */}
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
     </Box>
  )
}

export default TextEditor