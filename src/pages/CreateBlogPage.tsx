import { useRef, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { Editor as TinyMCEEditor } from "tinymce";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageAsync, fetchBlogByIdAsync, updateblogAsync, deleteThumbnailAsync } from "@/features/blog/blogSlice";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IoCloudDoneSharp } from "react-icons/io5";
import { getAllCategoriesAsync } from "../features/blog/blogSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { transformCategory } from "@/hepler";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "@/config/SelectStyleConfig";
interface RouteParams extends Record<string, string> {
  blogId: string;
}
const animatedComponents = makeAnimated();

const CreateBlogPage: React.FC = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [label, setLabel] = useState<string[]>([]);
  const [metadesc, setMetaDesc] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [publish, setPublish] = useState<boolean>(false);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { imageUrl, imageUploadStatus, blogPost, thumbnailDelete, blogUpdated, updateblogLoading, categories, cateryLoading } = useSelector((state: RootState) => state.blog);

  const { blogId } = useParams<RouteParams>();
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    dispatch(uploadImageAsync(file));
  };

  const handleMetaDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMetaDesc(event.target.value);
  };

  const handleImageUpload = (blobInfo: any, progress: (percentage: number) => void) => {
    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/upload-file`, true);

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject(new Error("HTTP Error: " + xhr.status));
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(new Error("HTTP Error: " + xhr.status));
          return;
        }

        const json = JSON.parse(xhr.responseText);
        if (!json || typeof json.data?.location !== "string") {
          reject(new Error("Invalid JSON: " + xhr.responseText));
          return;
        }

        resolve(json.data.location);
      };

      xhr.onerror = () => {
        reject(new Error("Image upload failed"));
      };

      xhr.send(formData);
    });
  };

  useEffect(() => {
    dispatch(fetchBlogByIdAsync(blogId));
  }, [thumbnailDelete, imageUrl]);

  useEffect(() => {
    if (blogPost !== null) {
      setTitle(blogPost?.title);
      setMetaDesc(blogPost?.metaDescription);
      setContent(blogPost?.content);
      setCategory(blogPost?.categories);
      setLabel(blogPost?.tags);
      setSelectedImage(blogPost?.thumbnail);
      setPublish(blogPost?.isPublished);
    }
  }, [blogPost, imageUrl]);

  const saveblog = () => {
    const data = {
      thumbnail: imageUrl || selectedImage,
      categories: category,
      tags: label,
      content: content,
      metaDescription: metadesc,
      title: title,
      isPublished: publish,
      id: blogId,
    };
    dispatch(updateblogAsync(data));
  };
  const handleBlogPublish = () => {
    setPublish(true);
    saveblog();
    if (blogUpdated) toast.success("blog publish successfull");
  };

  const handleblogsave = () => {
    saveblog();
    if (blogUpdated) toast.success("blog saved successfully");
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      saveblog();
    }, 5000);
    return () => clearTimeout(handler);
  }, [category, label, metadesc, content, title, imageUrl]);
  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, []);
  console.log(category);
  console.log(label);
  return (
    <Wrapper>
      <Navbar>
        <div className="nav_container">
          <div className="logo_icon">
            <div className="menu_icon">
              <IoMdArrowRoundBack size={30} onClick={() => navigate("/")} />
            </div>
            <div className="logo">
              <img src="/image/mscorpreslogo.jpeg" alt="logo" />
            </div>
          </div>
          <div className="profile">
            <div className="image">
              <img src="/image/user.png" alt="user" />
            </div>
          </div>
        </div>
      </Navbar>
      <div className="blogwrite_section">
        <div className="left">
          <div className="title">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="editor">
            <Editor
              onEditorChange={log}
              value={content}
              onInit={(_, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              apiKey={import.meta.env.VITE_TINYMC_API_KEY}
              init={{
                height: 560,
                menubar: false,
                plugins: ["advlist", "autolink", "link", "image", "lists", "charmap", "preview", "anchor", "pagebreak", "searchreplace", "wordcount", "visualblocks", "visualchars", "code", "fullscreen", "insertdatetime", "media", "table", "emoticons", "help", "fontselect"],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | fontselect | " +
                  "alignleft aligncenter alignright alignjustify | bullist numlist " +
                  "outdent indent | removeformat | link image | table tabledelete | " +
                  "tableprops tablerowprops tablecellprops | tableinsertrowbefore " +
                  "tableinsertrowafter tabledeleterow | tableinsertcolbefore " +
                  "tableinsertcolafter tabledeletecol | fontselect | help",
                content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                file_picker_types: "file image media",
                automatic_uploads: true,
                images_reuse_filename: true,
                images_upload_handler: handleImageUpload,
              }}
            />
          </div>
        </div>
        <div className="right">
          <div className="flex items-center justify-center gap-2 py-10 action">
            {updateblogLoading ? (
              <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <span>
                <IoCloudDoneSharp size={25} className="text-slate-600" />{" "}
              </span>
            )}

            <Button variant={"outline"} className="px-10 border shadow-md border-slate-400" onClick={handleblogsave}>
              Save
            </Button>
            <Button variant={"default"} className="flex gap-3" onClick={handleBlogPublish}>
              <IoMdSend size={20} />
              Publish
            </Button>
          </div>
          <div className="flex justify-center thumbnail">
            {!imageUploadStatus && !imageUrl && !selectedImage && (
              <label className="custum-file-upload" htmlFor="file">
                <div className="icon">
                  <FaRegImage size={50} />
                </div>
                <div className="text">
                  <p>Click to upload image</p>
                </div>
                <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
            {!selectedImage && imageUploadStatus && (
              <div className="image_load ">
                {" "}
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              </div>
            )}
            {!imageUploadStatus && (selectedImage || imageUrl) && (
              <div className="relative thumbnail_img">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className="">
                      <MdDelete size={25} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>Do you want to delete this thumbnail?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          dispatch(deleteThumbnailAsync(blogId));
                        }}
                      >
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <img src={selectedImage || imageUrl} alt="Preview" />
              </div>
            )}
          </div>
          <div className="label">
            <div className="w-full px-3 py-3">
              <CreatableSelect
                isClearable={false}
                value={transformCategory(label)}
                onChange={(e: any) => {
                  setLabel(
                    e.map((item: any) => {
                      return item.value;
                    })
                  );
                }}
                components={animatedComponents}
                isMulti
                closeMenuOnSelect={false}
                blurInputOnSelect={false}
                styles={customStyles}
                placeholder={"create lables"}
              />
            </div>
          </div>
          <div className="px-3 py-3 category">
            <Select
            placeholder="select categories"
              isLoading={cateryLoading}
              isClearable={false}
              value={transformCategory(category)}
              onChange={(e: any) => {
                setCategory(
                  e.map((item: any) => {
                    return item.value;
                  })
                );
              }}
              components={animatedComponents}
              isMulti
              options={transformCategory(categories?.data)}
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              styles={customStyles}
            />
          </div>
          <div></div>
          <div className="px-3 py-3 meta_description">
            <Textarea placeholder="Meta description" onChange={handleMetaDescChange} value={metadesc} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  .blogwrite_section {
    display: grid;
    grid-template-columns: 1fr 350px;
  }
  .left {
    min-height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: hidden;
    .title {
      margin-top: 50px;
      padding: 0 20px;

      input {
        font-size: 17px;
        font-weight: 600;
        width: 100%;
        border: none;
        outline: none;
        border-bottom: 2px solid #04afa9;
        padding-bottom: 10px;
      }
    }
    textarea {
      height: 100%;
      border: none;
      outline: none;
    }
    .mce-content-body {
      outline: none;
    }
    .tox-tinymce {
      border-radius: 0;
      border: none;
    }
  }
  .right {
    min-height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    overflow-y: scroll;
    border-left: 1px solid lightgray;
    .custum-file-upload {
      height: 200px;
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: space-between;
      gap: 20px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border: 2px dashed #cacaca;
      background-color: rgba(255, 255, 255, 1);
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
    }
    .image_load {
      height: 200px;
      width: 300px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .thumbnail_img {
      height: 200px;
      width: 300px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      button {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 30px;
        font-size: 30px;
        width: 30px;
        color: #fff;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .custum-file-upload .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .custum-file-upload .icon {
      height: 80px;
      color: rgba(75, 85, 99, 1);
    }

    .custum-file-upload .text {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .custum-file-upload .text span {
      font-weight: 400;
      color: rgba(75, 85, 99, 1);
    }

    .custum-file-upload input {
      display: none;
    }
    .meta_description {
      textarea {
        max-height: 200px;
        width: 100%;
        min-height: 200px;
        outline: none;
        padding: 10px;
        border-radius: 5px;
      }
    }
  }
`;

const Navbar = styled.section`
  max-height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: 1px solid lightgray;
  overflow: hidden;
  position: relative;
  .nav_container {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
  }
  .logo_icon {
    display: flex;
    gap: 30px;
    align-items: center;
    img {
      width: 250px;
    }
    .menu_icon {
      color: #546e7a;
      cursor: pointer;
    }
  }
  .profile {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default CreateBlogPage;
