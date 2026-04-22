import { useState, useEffect } from "react";
import api from "../api/api.js";
import { toast } from "react-toastify";
import AppShell from "../components/ui/AppShell.jsx";
import { ActionButton, Card, InputField, TextAreaField } from "../components/ui/primitives.jsx";
import { announcePolite } from "../utils/a11y.js";
import Dialog from "../components/ui/Dialog.jsx";

export default function FileExplorerUI() {
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");
  const [recents, setRecents] = useState([]);
  const [isFolder, setIsFolder] = useState(false)



const fetchPath = async (customPath) => {
  const finalPath = customPath || path;


  try {
    const res = await api.post("/api/editor", {
      path: finalPath,
    });

    const result = res.data;

    
    if (result.type === "file") {
      setIsFolder(false);  
      setContent(
        typeof result.content === "object"
          ? JSON.stringify(result.content, null, 2)
          : result.content || ""
      );
    } else if (result.type === "folder") {
     

      setIsFolder(true);
      setContent(result.content);
    }

    setPath(finalPath);
    setRecents(result.history || []);
    announcePolite("File loaded in editor.");
  } catch {
    announcePolite("Failed to load file.");
  }
};

const onFilesSelect = (newPath) => {
  
  console.log("NewPath: ", newPath);
  fetchPath(newPath);
};


  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await api.get("/api/editor/");
        setRecents(response.data || []);
      } catch {
        setRecents([]);
      }
    };

    fetchRecent();
  }, []);

  const saveFile = async () => {
    const payload = {
      path,
      contents: content,
    };

    try {
      const res = await api.post("/api/editor/save", payload);
      toast.success(res.data.msg);
      announcePolite("File saved.");
    } catch {
      toast.error("Failed to save file.");
      announcePolite("Failed to save file.");
    }
  };

  return (
    <AppShell
      title="File Editor"
      description="Load config files by path, edit content, and save quickly with Cmd/Ctrl + S."
    >
      <section className="space-y-4">
        <Card className="space-y-3">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <InputField
              id="editor-path"
              label="File Path"
              name="file_path"
              autoComplete="off"
              spellCheck={false}
              placeholder="/home/user/.config/example.conf…"
              aria-label="File path"
              value={path}
              onChange={(event) => setPath(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  fetchPath(event.target.value);
                }
              }}
            />
            <ActionButton onClick={()=>{fetchPath(path)}} variant="primary" aria-label="Load file path">
              Load
            </ActionButton>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-[var(--text-1)]">Recent Files</h2>
            <ul className="grid max-h-36 gap-2 overflow-y-auto" role="list">
              {recents.map((entry) => (
                <li key={entry}>
                  <button
                    type="button"
                    className="ui-control ui-focus block w-full truncate px-3 py-2 text-left text-sm text-[var(--text-1)]"
                    onClick={() => setPath(entry)}
                    aria-label={`Use recent file ${entry}`}
                  >
                    {entry}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[var(--text-1)]">Editor</h2>
            <ActionButton
              onClick={saveFile}
              variant="primary"
              data-editor-save="true"
              aria-label="Save file"
            >
              Save
            </ActionButton>
          </div>

          <TextAreaField
            id="editor-content"
            label="File Content"
            name="file_content"
            aria-label="File content"
            className="min-h-[500px] resize-y font-mono"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Card>
      </section>

        {
          isFolder ?
           <Dialog
           isOpen={isFolder}
           onClose={()=>{setIsFolder(!isFolder)}}
           title={'Files avaliable'}
           description={'You have provided a folder please select a file among them to use the text editor'}
           showCloseButton
           >

               <ul className="grid  max-h-[45vh] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {content  && (content || []).map((option,index) => {
           
            return (
              <li key={index}>
                <button
                  type="button"
                  
                  className={`ui-control ui-focus flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm ${
                    isFolder ? "border-[var(--accent)] text-[var(--text-0)]" : "text-[var(--text-1)]"
                  }`}
                  aria-pressed={isFolder}
                  aria-label={`Toggle ${option.name}`}
                >
                  <span className="min-w-0 truncate">{option.name}</span>
                  <span className="ui-pill" onClick={() => {
                                const newPath = option.path;
                                onFilesSelect(newPath);
                          }}
                    >Select</span>
                </button>
              </li>
            );
          })}
        </ul>
            
          </Dialog>
           :
           ''

        }


    </AppShell>
  );
}
