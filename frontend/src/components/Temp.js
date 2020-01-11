import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

function Temp() {
  return (
    <Box width={300}>
        <Card 
            style={{border: "2px solid #008403"}}
        >
            <CardHeader
                title="Shrimp and Chorizo"
                color="primary"
                style={{backgroundColor: '#68b733', color: 'white'}}
            />
             <CardContent>
                <List component="nav" aria-label="mailbox folders">
                    <ListItem>
                        <Checkbox
                            value="checkedA"
                            inputProps={{ 'aria-label': 'Checkbox A' }}
                            color="primary"
                        />
                        <Typography variant="body1" component="span">
                            Zrób kanapkę
                        </Typography>
                    </ListItem>
                    <Divider light />
                    <ListItem>
                        <Checkbox
                            value="checkedA"
                            inputProps={{ 'aria-label': 'Checkbox A' }}
                            color="primary"
                        />
                        <Typography variant="body1" component="span">
                            Zrób kanapkę
                        </Typography>
                    </ListItem>
                    <Divider light />
                    <ListItem>
                        <Checkbox
                            value="checkedA"
                            inputProps={{ 'aria-label': 'Checkbox A' }}
                            color="primary"
                        />
                        <Typography variant="body1" component="span">
                            Zrób kanapkę
                        </Typography>
                    </ListItem>
                    <Divider light />
                    <ListItem>
                        <Checkbox
                            value="checkedA"
                            inputProps={{ 'aria-label': 'Checkbox A' }}
                            color="primary"
                        />
                        <Typography variant="body1" component="span">
                            Zrób kanapkę
                        </Typography>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    </Box>
  );
}

export default Temp;