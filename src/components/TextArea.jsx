import {useState} from "react";

export function TextArea(){
    const [text, setText] = useState('');
    const[size, setSize] = useState(16);
    const [bold, setBold] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [comments, setComments] = useState([]);
    const [addComments, setAddCommetns] = useState(false);
    const [isOpenComments, setIsOpenComments] = useState(false);
    const[editingID, setEditingId] = useState(null);

    const closeEditing = () => {
        setEditingId(null);
        setIsOpenComments(false);
        setAddCommetns(false);
        setText('')
    }

    const editComment = (id) => {
        setAddCommetns(true)
        setIsOpenComments(false)
        const commentToEdit=comments.find(comment => comment.id === id);
        setText(commentToEdit.text);
        setEditingId(id)
    }

    const saveComment = () => {
        if(text.trim() === '')return
        setComments(prev=>
            prev.map(comment => comment.id === editingID
            ? {...comment, text}
            : comment
            )
        )
        setEditingId(null)
        setText('')
        setAddCommetns(false)
        setIsOpenComments(true)
}

const addComment=()=>{
    if(text.trim() === '')return

    setComments(prev=> [...prev,
        {
            id:Date.now(),
            text:text,
        }]);
    setBold(false)
    setUnderline(false)
    setSize(16)
    setIsOpenComments(true)
    setAddCommetns(false)
    setText('');
    setEditingId(null)
}

const handleComents=()=>{
        if(editingID){
            saveComment()
        }else{
            addComment()
        }
    }
    const resetTextArea = () => {
        setText('');
        setSize(16);
        setBold(false);
        setUnderline(false)
    }

    const deleteComment=(id)=>{
        setComments(prev=> prev.filter(item => item.id!==id));
    }

    const changeFontSize = (action) => {
        if (action === 'increase'){
            setSize(prevSize => Math.min(23, prevSize + 1));
        }else if(action === 'decrease'){
            setSize(prevSize => Math.max(12,prevSize - 1));
        }
    }

    if(comments.length > 0 && isOpenComments){
        return (
            <div>
                <h2 className="text-2xl text-red-700 ">comentarios</h2>
                {comments?.map((comment) =>(
                    <div
                        className="flex gap-2"
                        key={comment.id} >
                        <p >{comment.text}</p>
                        <button
                            className="bg-fuchsia-100 text-red-700"
                            onClick={()=>deleteComment(comment.id)}>delete</button>
                        <button
                            className="bg-fuchsia-100 text-red-700"
                            onClick={()=>editComment(comment.id)}>editar comentario</button>
                    </div>
                ))}
                <button onClick={()=>setIsOpenComments(false)} >close comments</button>
            </div>
        )
    }
    if(addComments){
        return(
            <section className= "flex justify-center flex-wrap px-4 py-6 lg:px-8">
                <div className="max-w-lg flex flex-wrap  gap-4">
                    <button
                        className="w-10 bg-fuchsia-100 rounded-lg text-black "
                        onClick={()=>changeFontSize('increase')}>
                        A+
                    </button>
                    <button
                        className="w-10 mx-5 my-2 bg-fuchsia-100 rounded-lg text-black "
                        onClick={()=> changeFontSize('decrease')}>
                        A-
                    </button>

                    <button    className="w-18 mx-5 my-2 bg-fuchsia-100 rounded-lg text-black " onClick={()=> setUnderline(prev=>!prev)}>
                        underline
                    </button>

                    <button
                        className="w-12 mx-5 my-2 bg-fuchsia-100 rounded-lg text-black "
                        onClick={()=> setBold(prev=>!prev)}>
                        bold
                    </button>
                    <button
                        className="w-20 mx-5 my-2 bg-fuchsia-100 rounded-lg text-black cursor-pointer"
                        onClick={handleComents}>
                        {editingID ? 'editar' : 'guardar'}
                    </button>
                    <button    className="w-10 mx-5 my-2 bg-fuchsia-100 rounded-lg text-black "
                               onClick={resetTextArea}>
                        reset
                    </button>
                    <button
                        className="font-bold hover:bg-red-500 rounded-full cursor-pointer w-6"
                        onClick={closeEditing}>
                        X
                    </button>
                    <textarea
                        placeholder="Add a comment four us"
                        className={`w-full max-w-md h-20 p-4 border resize-none rounded-md outline-none 
                    ${ bold ? "font-bold" : ""}
                   ${ underline ? "underline" : ""}
                    `}
                        style={{ fontSize: `${size}px` }}
                        onChange={(e)=> setText(e.target.value)}
                        value={text}
                    ></textarea>
                </div>
            </section>
        )
    }
    return (
        <div>
            <button
                className="bg-amber-300 text-black rounded-sm cursor-pointer"
                onClick={()=> setAddCommetns(true)}>add a comment </button>
            {comments?.length > 0 &&
                <button
                    className="bg-amber-300 text-black rounded-sm cursor-pointer"
                    onClick={()=> setIsOpenComments(true)}>watch comments
                </button>
            }
        </div>

    )
}