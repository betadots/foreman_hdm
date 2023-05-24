import React from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionToggle, AccordionExpandedContentBody, CodeBlock, CodeBlockCode, Title } from '@patternfly/react-core';

const Hierarchy = ({ hierarchy }) => {
  const [expanded, setExpanded] = React.useState([]);

  const toggle = id => {
    const index = expanded.indexOf(id);
    const newExpanded =
      index >= 0 ? [...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length)] : [...expanded, id];
    setExpanded(newExpanded);
  };

  const valueContent = (value) => {
    if (value) {
      return (
        <CodeBlock>
          <CodeBlockCode>{value}</CodeBlockCode>
        </CodeBlock>
      );
    } else {
      const message = __("No value present");
      return (<div>{message}</div>);
    }
  };

  const formattedPath = (file) => {
    if (file.value) {
      return (
        <span>{file.path}</span>
      );
    } else {
      return (
        <em className="pf-u-disabled-color-100">{file.path}</em>
      );
    }
  };

  const accordionItems = hierarchy.files.map((file) => {
    const value = valueContent(file.value);
    const id = `${file.path}-toggle`;
    const path = formattedPath(file);

    return (
      <AccordionItem>
        <AccordionToggle
          onClick={() => toggle(id)}
          isExpanded={expanded.includes(id)}
          id={id}
        >
          {path}
        </AccordionToggle>
        <AccordionContent id={`${id}-content`} isHidden={!expanded.includes(id)} isFixed>
          {value}
        </AccordionContent>
      </AccordionItem>
    );
  });
  return (
    <div className="pf-u-mb-sm">
      <Title headingLevel="h3">{hierarchy.hierarchy_name}</Title>

      <Accordion isBordered>
        {accordionItems}
      </Accordion>
    </div>
  );
};

export default Hierarchy;
