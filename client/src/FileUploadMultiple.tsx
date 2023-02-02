import { ChangeEvent, useState } from 'react';
import Loader from './Loader';
import { createLogger } from 'vite';

function FileUploadMultiple() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [links, setLinks] = useState([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    setIsLoaded(true);

    if (!fileList) {
      return;
    }

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    fetch('http://localhost:3000/api/files/upload', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(({ files }): any => {
        console.log(Object.values(files));
        const images = Object.values(files).map(
          ({ filepath }: any) => filepath
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setLinks(images);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoaded(false));
  };

  const files = fileList ? [...fileList] : [];

  return (
    <div>
      <div className={'mt-6 text-lg leading-8 text-gray-600'}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className={
            'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
          }
          id={'file_input'}
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </div>

      {isLoaded && <Loader />}

      <div className={'mt-6 text-lg leading-8 text-gray-600'}>
        {files.length > 0 && (
          <button
            className={
              'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
            }
            onClick={handleUploadClick}
          >
            Upload
          </button>
        )}
      </div>

      <ul>
        {links.map((url, i) => (
          <li key={i}>
            <a
              download
              key={i}
              href={url}
              className={
                'font-medium text-blue-600 dark:text-blue-500 hover:underline'
              }
            >
              Download link {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileUploadMultiple;
