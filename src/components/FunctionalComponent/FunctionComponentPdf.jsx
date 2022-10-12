import React, { useState, useEffect } from 'react';
import { PdfLoader, PdfHighlighter, Tip, Highlight, Popup, AreaHighlight } from "react-pdf-highlighter";
import { testHighlights as _testHighlights } from "../test-highlights";
import { Spinner } from "../Spinner"
import { Sidebar } from "../Sidebar"
import "../style/pdf.css"
const testHighlights = _testHighlights

const FunctionComponentPdf = () => {
//for giving id to the new highlight
const getNextId = () => String(Math.random()).slice(2);
//got to selected hash
const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);
//reset hash function
const resetHash = () => { document.location.hash = "" }

//Highlight Popup function for view the comment, whenever somone mouseover on the highlighted text
const HighlightPopup = ({ comment }) =>
    comment.text ? (<div className="Highlight__popup">{comment.emoji} {comment.text}</div>) : null

//Testing pdf urls
const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf"
const SECONDARY_PDF_URL = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL
//Usestates
const [url, setUrl] = useState(initialUrl);
const [highlights, setHighlights] = useState(testHighlights[initialUrl] ? [...testHighlights[initialUrl]] : []);

//Reseting the Highlights
const resetHighlights = () => {
    setHighlights([]);
}
//Toggle function for changing the second url
const toggleDocument = () => {
    const newUrl = url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL
    setUrl(newUrl);
    setHighlights(testHighlights[newUrl] ? [...testHighlights[newUrl]] : [])
}

//For scrolling to the selected highlighted text in the pdf  
let scrollViewerTo = (highlight) => { }
const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash())

    if (highlight) {
        scrollViewerTo(highlight)
    }
}
const getHighlightById = (id) => {
    return highlights.find(highlight => highlight.id === id)
}

//addHighlight text function
const addHighlight = (highlight) => {
    console.log("Saving highlight", highlight)
    setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
}
//Updating the highlight Image screenshot, when someone make the highlight by pressing alt and select text a screenshot is generated which can be updated through this function
const updateHighlight = (highlightId, position, content) => {
    console.log("Updating highlight", highlightId, position, content)
    setHighlights(highlights.map(h => {
        const {
            id,
            position: originalPosition,
            content: originalContent,
            ...rest
        } = h
        return id === highlightId
            ? {
                id,
                position: { ...originalPosition, ...position },
                content: { ...originalContent, ...content },
                ...rest
            }
            : h
    }))
}
//useEffect for changing the scrolling hash whenever point to a new text
useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
});

return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar highlights={highlights} resetHighlights={resetHighlights} toggleDocument={toggleDocument} />
        <div style={{ height: "100vh", width: "75vw", position: "relative" }}>
            <PdfLoader url={url} beforeLoad={<Spinner />}>
                {pdfDocument => (
                    <PdfHighlighter
                        pdfDocument={pdfDocument}
                        enableAreaSelection={event => event.altKey}
                        onScrollChange={resetHash}
                        // pdfScaleValue="page-width"
                        scrollRef={scrollTo => {
                            scrollViewerTo = scrollTo
                            scrollToHighlightFromHash()
                        }}
                        //When the text selection is finished
                        onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (<Tip onOpen={transformSelection} onConfirm={comment => {
                            addHighlight({ content, position, comment })
                            hideTipAndSelection()
                        }}
                        />
                        )}
                        highlightTransform={(
                            highlight,
                            index,
                            setTip,
                            hideTip,
                            viewportToScaled,
                            screenshot,
                            isScrolledTo
                        ) => {
                            const isTextHighlight = !Boolean(
                                highlight.content && highlight.content.image
                            )

                            const component = isTextHighlight ? (<Highlight isScrolledTo={isScrolledTo} position={highlight.position} comment={highlight.comment} />
                            ) : (<AreaHighlight isScrolledTo={isScrolledTo} highlight={highlight} onChange={boundingRect => {
                                updateHighlight(highlight.id, { boundingRect: viewportToScaled(boundingRect) }, { image: screenshot(boundingRect) })
                            }}
                            />
                            )
                            return (
                                <Popup popupContent={<HighlightPopup {...highlight} />} onMouseOver={popupContent => setTip(highlight, highlight => popupContent)} onMouseOut={hideTip} key={index} children={component} />
                            )
                        }}
                        highlights={highlights}
                    />
                )}
            </PdfLoader>
        </div>
    </div>
)
}


export default FunctionComponentPdf