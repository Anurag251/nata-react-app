import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import profileImg from '../assets/images/default.png';

import { url } from '../url';

const CustomFormLayout = ({
  title,
  children,
  profile,
  full,
  activity,
  data,
  changePasswordUI,
  setChangePasswordStatus,
}) => {
  const [files, setFiles] = useState([]);
  const [profileShow, setProfileShow] = useState(false);
  const [profileNotChoosen, setProfileNotChoosen] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  let images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} className="upload-image" alt="preview" />
      </div>
    </div>
  ));

  const submitProfile = (img) => {
    if (typeof img === 'string' || img === [] || img[0] === undefined) {
      setProfileNotChoosen(true);
      return 0;
    }
    const formData = new FormData();
    formData.append('profile_picture', img[0], img[0].name);

    fetch(url + `/profile/${localStorage.getItem('id')}/`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileShow(false);
        setProfileNotChoosen(false);
        window.location.reload();
      })
      .catch((err) => {});
  };

  return (
    <div className="profile">
      <div className={`profile-bg ${profileShow ? 'activate' : ''}`}></div>
      <div className={`profile-update-popup ${profileShow ? 'activate' : ''}`}>
        <div className="close-profile" onClick={() => setProfileShow(false)}>
          <i className="fas fa-times"></i>
        </div>
        <div className="inner-profile">
          <div className="file-drag">
            <div className="drop-area" {...getRootProps()}>
              <input {...getInputProps()} />
              <p style={profileNotChoosen ? { color: 'red' } : null}>
                Click or Drop files here to upload
              </p>
              <div>{images}</div>
            </div>
            <button className="button" onClick={() => submitProfile(files)}>
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className={`container  ${full ? 'full' : ''}`}>
        {profile ? (
          <div>
            <div className="profile-name">
              <div
                className="image"
                onClick={() => setProfileShow(true)}
                style={{
                  backgroundImage: `url(${
                    data.profile_picture ? data.profile_picture : profileImg
                  })`,
                }}
              >
                <div className="camera-icon" title="Change Image">
                  <i className="fas fa-camera"></i>
                </div>
              </div>
              <div className="uesr-name">
                {data.full_name === '' ? '*No Name*' : data.full_name}
              </div>
              <div className="email">{data.email}</div>

              {changePasswordUI ? (
                <div className="button-group">
                  <button
                    className="button"
                    onClick={() => setChangePasswordStatus(true)}
                  >
                    Change Password
                  </button>
                </div>
              ) : null}

              {activity ? (
                <div className="button-group">
                  <Link className="button" to="/newReceiver">
                    Add New Receiver
                  </Link>

                  <Link className="button" to="/editReceiver">
                    Edit Receiver
                  </Link>

                  <Link className="button" to="/addBankDetails">
                    Add Bank Details for receiver
                  </Link>

                  <Link className="button" to="/transactionHistory">
                    Transaction History
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="edit-profile">
          <div className="info">
            <div className="title">{title}</div>
            {activity ? (
              <>
                <div className="form-title">Edit Sender Details</div>
              </>
            ) : null}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFormLayout;
