import EditBlogModal from "../components/EditBlogModal";
import ViewBlogModal from "../components/ViewBlogModal";
import { BlogData } from "../data/blogData";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { convertDate } from "../utils/convertDate";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

function HomePage() {
  const posts = useAppSelector((state: RootState) => state.posts.posts);
  const reversedPosts = [...posts].reverse();
  const [selectedPost, setSelectedPost] = useState<BlogData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handlePostClick = (post: BlogData) => {
    setSelectedPost(post);
    setIsEditModalOpen(false);
  };

  const handleEditPostClick = (post: BlogData) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => setSelectedPost(null);

  return (
    <main className="md:p-6 p-4 overflow-auto">
      <section className="md:flex md:items-start md:justify-start flex items-center justify-center w-full font-lexend-deca space-y-2">
        <h1 className="text-lg font-bold text-tertiary">Latest</h1>
      </section>

      {/* Modals */}
      <div>
        {selectedPost && !isEditModalOpen && (
          <ViewBlogModal
            postId={selectedPost.id}
            post={selectedPost}
            onClose={handleCloseModal}
          />
        )}
        {selectedPost && isEditModalOpen && (
          <EditBlogModal
            postId={selectedPost.id}
            post={selectedPost}
            onClose={handleCloseModal}
          />
        )}
      </div>

      <section className="mt-12 flex flex-col items-start gap-4 justify-center w-full">
        {reversedPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-row items-start justify-start w-full hover:border hover:border-primary hover:rounded-lg transition-all duration-300 p-2"
          >
            <div className="hidden md:flex md:w-1/6 md:flex-col md:items-start md:justify-start md:space-y-10">
              <p className="font-semibold font-lexend-deca leading-loose text-white text-2xl">
                {convertDate(post.date)}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center md:items-start md:justify-start md:w-5/6 w-full md:mr-8">
              <h2 className="font-dm-serif text-primary text-2xl">
                {post.title}
              </h2>
              <p
                className="font-lexend-deca text-base line-clamp-3 hover:cursor-pointer text-tertiary mt-3"
                onClick={() => handlePostClick(post)}
              >
                {post.content}
              </p>
              <p className="font-dm-serif text-sm italic space-x-6 text-tertiary">
                Written By {post.author}
                <span className="md:hidden ml-1">
                  on {convertDate(post.date)}
                </span>
              </p>

              <div className="flex space-x-2 mt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs p-2 mx-auto font-lexend-deca rounded-full border border-primary text-primary"
                  >
                    {tag}
                  </span>
                ))}
                <span className="flex items-center justify-center">
                  <button
                    className="bg-none hover:animate-bounce duration-200"
                    onClick={() => handleEditPostClick(post)}
                  >
                    <MdEdit size={20} color="#6EEB83" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
