import React from 'react';
import { BlogData } from '../data/blogData';
import { IoClose } from 'react-icons/io5';
import { FaTrash } from "react-icons/fa6";
import { convertDate } from '../utils/convertDate';
import { useAppDispatch } from '../redux/hooks';
import { deletePost } from '../redux/postSlice';


interface ModalProps {
  post: BlogData;
  postId: string;
  onClose: () => void;
}

const ViewBlogModal: React.FC<ModalProps> = ({ post, postId, onClose }) => {
  const dispatch = useAppDispatch();
  
  const deleteBlogPost = () => {
    dispatch(deletePost(postId));
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 p-2">
      <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-md overflow-auto">
      <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-dm-serif">{post.title}</h2>
          <button
            onClick={onClose}
            className="bg-none"
            aria-label="Close Modal"
          >
            <IoClose size={24} color="#6EEB83" />
          </button>
        </div>
        <p className="mt-4 text-tertiary font-lexend-deca">{post.content}</p>
        <p className="text-tertiary italic font-dm-serif mt-2">By {post.author} on {convertDate(post.date)}</p>
        
        <div className='mt-1 flex items-end justify-end w-full'>
            <button className='bg-none' onClick={deleteBlogPost}>
                <FaTrash size={24} color="#6EEB83" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBlogModal;
