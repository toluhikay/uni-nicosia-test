import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

// NOTE : - this file is jsx due to the Syntax highlighter complaining of an overload due to type inference, also due to the urgency of the work

const ResponseFormatter = ({ response }) => {
  return (
    <Markdown
      children={response}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={vscDarkPlus}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default ResponseFormatter;
