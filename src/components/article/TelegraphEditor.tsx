"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Quote,
  Heading2,
  Heading3,
  Link2,
  Image as ImageIcon,
  List,
  ListOrdered,
  Minus,
  Code2,
  X,
  Check,
} from "lucide-react";

/* ─── Types ─── */
type ToolbarButton = {
  id: string;
  icon: React.ReactNode;
  title: string;
  action: () => void;
  active?: boolean;
};

interface Props {
  value: string; // HTML string
  onChange: (html: string) => void;
  placeholder?: string;
}

/* ─── Helpers ─── */
function execCmd(command: string, value?: string) {
  document.execCommand(command, false, value ?? undefined);
}

function isActive(command: string) {
  try {
    return document.queryCommandState(command);
  } catch {
    return false;
  }
}

/* ─── Component ─── */
export default function TelegraphEditor({
  value,
  onChange,
  placeholder,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [, forceUpdate] = useState(0); // trigger re-render for toolbar active states
  const savedRange = useRef<Range | null>(null);

  /* Initialise editor content once */
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Save selection before modal opens */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  /* Restore selection after modal */
  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
    editorRef.current?.focus();
  };

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    forceUpdate((n) => n + 1);
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Ctrl+B / Cmd+B → Bold
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      execCmd("bold");
      handleInput();
    }
    // Ctrl+I / Cmd+I → Italic
    if ((e.ctrlKey || e.metaKey) && e.key === "i") {
      e.preventDefault();
      execCmd("italic");
      handleInput();
    }
    // Ctrl+K / Cmd+K → Link
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      saveSelection();
      setShowLinkModal(true);
    }
  };

  /* ── Toolbar actions ── */
  const applyBlock = (tag: string) => {
    execCmd("formatBlock", tag);
    editorRef.current?.focus();
    handleInput();
  };

  const insertDivider = () => {
    const hr = document.createElement("hr");
    hr.className = "tg-divider";
    const br = document.createElement("p");
    br.innerHTML = "<br/>";
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.collapse(false);
      range.insertNode(br);
      range.insertNode(hr);
      range.setStartAfter(br);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      editorRef.current?.appendChild(hr);
      editorRef.current?.appendChild(br);
    }
    handleInput();
  };

  /* Insert image block */
  const insertImage = () => {
    if (!imageUrl.trim()) return;
    restoreSelection();

    const figure = document.createElement("figure");
    figure.className = "tg-figure";
    const img = document.createElement("img");
    img.src = imageUrl.trim();
    img.alt = imageCaption.trim();
    img.className = "tg-img";

    figure.appendChild(img);

    if (imageCaption.trim()) {
      const cap = document.createElement("figcaption");
      cap.className = "tg-figcaption";
      cap.textContent = imageCaption.trim();
      figure.appendChild(cap);
    }

    // Insert after current cursor
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.collapse(false);
      range.insertNode(figure);
      range.setStartAfter(figure);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      editorRef.current?.appendChild(figure);
    }

    setImageUrl("");
    setImageCaption("");
    setShowImageModal(false);
    handleInput();
  };

  /* Insert link */
  const insertLink = () => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    const url = linkUrl.trim().startsWith("http")
      ? linkUrl.trim()
      : `https://${linkUrl.trim()}`;
    execCmd("createLink", url);
    // Make link open in new tab
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const anchor = sel.anchorNode?.parentElement?.closest("a");
      if (anchor) anchor.target = "_blank";
    }
    setLinkUrl("");
    setShowLinkModal(false);
    handleInput();
  };

  const toolbarButtons: ToolbarButton[] = [
    {
      id: "bold",
      icon: <Bold className="w-4 h-4" />,
      title: "Bold (Ctrl+B)",
      action: () => {
        execCmd("bold");
        handleInput();
      },
      active: isActive("bold"),
    },
    {
      id: "italic",
      icon: <Italic className="w-4 h-4" />,
      title: "Italic (Ctrl+I)",
      action: () => {
        execCmd("italic");
        handleInput();
      },
      active: isActive("italic"),
    },
    {
      id: "h2",
      icon: <Heading2 className="w-4 h-4" />,
      title: "Heading 2",
      action: () => applyBlock("h2"),
    },
    {
      id: "h3",
      icon: <Heading3 className="w-4 h-4" />,
      title: "Heading 3",
      action: () => applyBlock("h3"),
    },
    {
      id: "quote",
      icon: <Quote className="w-4 h-4" />,
      title: "Blockquote",
      action: () => applyBlock("blockquote"),
    },
    {
      id: "ul",
      icon: <List className="w-4 h-4" />,
      title: "Bullet List",
      action: () => {
        execCmd("insertUnorderedList");
        handleInput();
      },
    },
    {
      id: "ol",
      icon: <ListOrdered className="w-4 h-4" />,
      title: "Numbered List",
      action: () => {
        execCmd("insertOrderedList");
        handleInput();
      },
    },
    {
      id: "code",
      icon: <Code2 className="w-4 h-4" />,
      title: "Code Block",
      action: () => applyBlock("pre"),
    },
    {
      id: "link",
      icon: <Link2 className="w-4 h-4" />,
      title: "Insert Link (Ctrl+K)",
      action: () => {
        saveSelection();
        setShowLinkModal(true);
      },
    },
    {
      id: "image",
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Insert Image via URL",
      action: () => {
        saveSelection();
        setShowImageModal(true);
      },
    },
    {
      id: "divider",
      icon: <Minus className="w-4 h-4" />,
      title: "Horizontal Divider",
      action: insertDivider,
    },
  ];

  return (
    <div className="tg-editor-wrap">
      {/* ── Floating Toolbar ── */}
      <div className="tg-toolbar">
        {toolbarButtons.map((btn, i) => (
          <button
            key={btn.id}
            onMouseDown={(e) => {
              e.preventDefault();
              btn.action();
            }}
            title={btn.title}
            className={`tg-toolbar-btn${btn.active ? " tg-toolbar-btn--active" : ""}${
              i === 4 || i === 7 || i === 8 ? " tg-toolbar-sep" : ""
            }`}
            type="button"
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* ── Editor Content ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={() => forceUpdate((n) => n + 1)}
        onMouseUp={() => forceUpdate((n) => n + 1)}
        data-placeholder={placeholder ?? "Mulai tulis artikel kamu di sini..."}
        className="tg-content"
      />

      {/* ── Link Modal ── */}
      {showLinkModal && (
        <div
          className="tg-modal-overlay"
          onClick={() => setShowLinkModal(false)}
        >
          <div className="tg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tg-modal-header">
              <Link2 className="w-4 h-4 text-blue-500" />
              <span>Insert Link</span>
              <button
                className="tg-modal-close"
                onClick={() => setShowLinkModal(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              autoFocus
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && insertLink()}
              className="tg-modal-input"
            />
            <div className="tg-modal-actions">
              <button
                className="tg-modal-cancel"
                onClick={() => setShowLinkModal(false)}
              >
                Batal
              </button>
              <button className="tg-modal-confirm" onClick={insertLink}>
                <Check className="w-4 h-4" /> Sisipkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Image Modal ── */}
      {showImageModal && (
        <div
          className="tg-modal-overlay"
          onClick={() => setShowImageModal(false)}
        >
          <div className="tg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tg-modal-header">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>Insert Image</span>
              <button
                className="tg-modal-close"
                onClick={() => setShowImageModal(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              autoFocus
              type="url"
              placeholder="URL gambar: https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="tg-modal-input"
            />
            <input
              type="text"
              placeholder="Caption (opsional)"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && insertImage()}
              className="tg-modal-input mt-2"
            />
            {/* Preview */}
            {imageUrl && (
              <div className="tg-img-preview">
                <img
                  src={imageUrl}
                  alt="preview"
                  onError={(e) => (e.currentTarget.style.opacity = "0.3")}
                />
              </div>
            )}
            <div className="tg-modal-actions">
              <button
                className="tg-modal-cancel"
                onClick={() => setShowImageModal(false)}
              >
                Batal
              </button>
              <button className="tg-modal-confirm" onClick={insertImage}>
                <Check className="w-4 h-4" /> Sisipkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
