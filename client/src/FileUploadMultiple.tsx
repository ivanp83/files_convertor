import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

function FileUploadMultiple() {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [options, setOptions] = useState<string>('webp');
  const [resData, setResData] = useState<any | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };
  const handleOptionsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOptions(e.target.value);
  };

  const handleUploadClick = (e: FormEvent) => {
    e.preventDefault();
    if (!fileList) {
      return;
    }

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file`, file, file.name);
    });

    data.append('format', options);
    fetch('http://localhost:3000/api/files/upload?format=webp', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => setResData(data))
      .catch(err => console.error(err));
  };

  const files = fileList ? [...fileList] : [];

  return (
    <div>
      {resData && (
        <ul>
          {resData.map((link: string, i: number) => (
            <li key={i}>
              <a href={link} download>
                {`Download file-${i + 1}`}
              </a>
            </li>
          ))}
        </ul>
      )}

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>
      <form onSubmit={handleUploadClick}>
        <div className="form-group">
          <label>
            Select format
            <select onChange={handleOptionsChange}>
              <option defaultValue="webp" value="webp">
                webp
              </option>
              <option value="jpeg">jpeg</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <input type="file" onChange={handleFileChange} multiple />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUploadMultiple;
