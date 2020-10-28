import { Container, List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

export default function Todo({ todos }) {
    return (
        <Container component="main" maxWidth="xs">
            <List>
                {todos.map((todo) => <ListItem key={todo.id}>
                    <ListItemText
                        primary={todo.title}
                    />
                </ListItem>
                )

                }
            </List>
        </Container>
    )
}
