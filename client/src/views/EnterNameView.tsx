import { authActions } from 'features/auth/redux/authSlice';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const EnterNameView = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleSubmit = () => {
    dispatch(authActions.setName(name));
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Card className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>Please enter your name:</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                placeholder="Name"
                onChange={handleNameChange}
                value={name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" onClick={handleSubmit} disabled={name === ''}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Container>
  );
};

export default EnterNameView;
