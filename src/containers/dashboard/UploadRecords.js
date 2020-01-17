import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';

import { uploadDocument, loadDocuments } from '../../actions/healthRecords';

import Banner from '../../components/elements/Banner';

export const UploadRecords = ({
  isUploadingDocument,
  loadDocuments,
  uploadDocument,
  uploadDocumentStatus,
  uploadedDocuments
}) => {
  const [showUploadErrorBanner, setShowUploadErrorBanner] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState('Invalid file type. Please try again.');

  const onDrop = useCallback(async ([file]) => {
    if (file == null) {
      setShowUploadErrorBanner(true);
      return;
    } else if (uploadDocumentStatus === 'failure') {
      setUploadErrorMessage('Document failed to upload. Please try again.');
      setShowUploadErrorBanner(true);
      return;
    }

    setShowUploadErrorBanner(false);
    uploadDocument(file);
    loadDocuments();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    disabled: isUploadingDocument,
    multiple: false,
    onDrop
  });

  useEffect(() => { loadDocuments(); }, []);

  return (
    <div className="upload-records">
      <div className="upload-records-wrapper">
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />

          {isUploadingDocument
            ? <FontAwesomeIcon icon="spinner" size="5x" spin />
            : <FontAwesomeIcon icon="file-upload" size="5x" />
          }

          {showUploadErrorBanner && (
            <Banner type="warning" close={() => setShowUploadErrorBanner(false)}>
              {uploadErrorMessage}
            </Banner>
          )}

          <div className="dropzone__instructions">
            Drop a valid health record PDF file here, or click to browse.
          </div>
        </div>

        <div className="uploaded-records">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocuments.map(document => (
                <tr key={document.id}>
                  <td>{document.filename}</td>
                  <td>{document.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

UploadRecords.propTypes = {
  uploadedDocuments: PropTypes.array.isRequired,
  isUploadingDocument: PropTypes.bool.isRequired,
  uploadDocumentStatus: PropTypes.string,
  loadDocuments: PropTypes.func.isRequired,
  uploadDocument: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    uploadedDocuments: state.healthRecords.uploadedDocuments,
    isUploadingDocument: state.healthRecords.uploadDocument.isUploading,
    uploadDocumentStatus: state.healthRecords.uploadDocument.uploadStatus
  };
}

export default connect(mapStateToProps, { uploadDocument, loadDocuments })(UploadRecords);
