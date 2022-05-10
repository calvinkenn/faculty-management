import React from "react";
import { useParams } from "react-router-dom";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import "./AnnounceFull.css";

const DUMMY_DATA = [
  {
    id: "1",
    title: "TEST TITLE",
    author: "TEST AUTHOR",
    date: "05/10/2022",
    image:
      "https://thumbs.dreamstime.com/b/important-announcement-written-speech-bubble-advertising-sign-vector-stock-illustration-173492245.jpg",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "2",
    title: "TEST TITLE 2",
    author: "TEST AUTHOR 2",
    date: "05/10/2022",
    image:
      "https://thumbs.dreamstime.com/b/important-announcement-written-speech-bubble-advertising-sign-vector-stock-illustration-173492245.jpg",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "3",
    title: "TEST TITLE 2",
    author: "TEST AUTHOR 2",
    date: "05/10/2022",
    image:
      "https://thumbs.dreamstime.com/b/important-announcement-written-speech-bubble-advertising-sign-vector-stock-illustration-173492245.jpg",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "4",
    title: "TEST TITLE 2",
    author: "TEST AUTHOR 2",
    date: "05/10/2022",
    image:
      "https://thumbs.dreamstime.com/b/important-announcement-written-speech-bubble-advertising-sign-vector-stock-illustration-173492245.jpg",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const AnnounceFull = (props) => {
  const announceId = useParams().annID;
  return (
    <div className="announce-main">
      <div className="announce-main-container">
        <MainNavigation inHome={true} />
        {DUMMY_DATA.map((item) => {
          if (item.id === announceId) {
            return (
              <div className="announce-container">
                <div>Title: {item.title}</div>
                <div>Author: {item.author}</div>
                <div>Date: {item.date}</div>
                <div>
                  <img src={item.image} alt="Announcement" />
                </div>
                <div>Content: {item.content}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AnnounceFull;
