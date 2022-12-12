import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: string[]
}

export default function ValidationError(props: Props) {
  return (
      <Message error>
          {props.errors && (
              <Message.List>
                  {props.errors.map((err: string, i) => (
                      <Message.Item key={i}>{err}</Message.Item>
                      ))}
              </Message.List>
              )}
      </Message>
  )
}