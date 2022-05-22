import {format} from 'timeago.js';

const ChatComp = ({ self, message }) => {
  return (
    <div className={`flex items-start ${self && `flex-row-reverse`}`}>
      <img
        src="https://avatars.githubusercontent.com/u/75943412?v=4"
        alt=""
        className="h-10 aspect-square rounded-md"
      />
      <div
        className={`w-2/3 mx-2 flex flex-col space-y-2 ${
          self ? `items-end` : `items-start`
        }`}>
        <p
          className={`py-2 px-4 rounded-md ${
            self ? `bg-white` : `bg-teal-800 text-white`
          }`}>
          {message.text}
        </p>
        <p className="text-sm">{format(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default ChatComp;
