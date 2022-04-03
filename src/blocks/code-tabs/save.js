export default ({ attributes }) => {
  const tabs = JSON.parse(attributes.tabs);

  return (
    <>
      <div className="code-tabs">
        <div className="code-tabs__button-area">
          {tabs.map(({ title }, index) => (
            <button className="code-tabs__button">
              {title || `Tab #${index + 1}`}
            </button>
          ))}
        </div>
        {tabs.map(({ title, content }, index) => (
          <div className="code-tabs__panel is-active">
            <section className="source-content">
              <div className="source-code-container">
                <pre
                  className={`brush: php; title: ; notranslate`}
                  title={title}
                >
                  {content}
                </pre>
              </div>
            </section>
          </div>
        ))}
      </div>
    </>
  );
};
