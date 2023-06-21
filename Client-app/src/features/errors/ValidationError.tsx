import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationError(props: Props) {
  return (
      <Message negative>
          {props.errors && (
              <Message.List>
                  {props.errors.map((err: string, i: any) => (
                      <Message.Item key={i}>{err}</Message.Item>
                      ))}
              </Message.List>
              )}
      </Message>
  )
}