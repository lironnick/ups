import axios from 'axios';
import { FormEvent, useState } from 'react';

function App() {
  const [files, setFiles] = useState<FileList | null>(null);

  function handleUploadFile(e: FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    axios.put(
      'https://ups.8dff4de0f25fcccd4438b4d856c116d3.r2.cloudflarestorage.com/8979ebe3-0478-4d55-a77b-769402e10f84-teste.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=3c341f9819ceb10400b9823201208958%2F20240313%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240313T183902Z&X-Amz-Expires=600&X-Amz-Signature=c8162f13a06a71a2cae4038ea064236dbf4d68888baccab1015f1ce6efdd45d8&X-Amz-SignedHeaders=host&x-id=PutObject',
      file,
      {
        headers: {
          'Content-Type': 'video/mp4',
        },
      }
    );
  }
  return (
    <form onSubmit={handleUploadFile}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFiles(e.target.files)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
