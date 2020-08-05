import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//redux
import { connect } from 'react-redux';
//components
import { editUserDetails } from '../redux/actions/userActions';
//MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//icons
import EditIcon from '@material-ui/icons/Edit';
const styles = (theme) => ({
    ...theme.spreadThis
});
class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit user details " placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                />
                <DialogTitle>

                </DialogTitle>
            </Fragment>
        )
    }
}
EditDetails.propTypes = {

};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});
export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
