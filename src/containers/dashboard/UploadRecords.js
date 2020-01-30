import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';

import { uploadDocument, loadDocuments, downloadDocument, deleteDocument } from '../../actions/healthRecords';

import renderDate from '../../utils/dates';

import Banner from '../../components/elements/Banner';

export const UploadRecords = ({
  deleteDocument,
  downloadDocument,
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
    await uploadDocument(file);
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
          <table className="uploaded-records__table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded</th>
                <th aria-label="buttons"></th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocuments.map(doc => (
                <tr key={doc.id}>
                  <td className="uploaded-records__tablecell-wide">{doc.filename}</td>
                  <td className="uploaded-records__tablecell-short">{renderDate(doc.updated_at)}</td>
                  <td className="uploaded-records__tablecell-button">
                    <Button
                      color="primary"
                      onClick={() => downloadDocument(doc.id, doc.filename)}
                      mini
                    >
                      Download
                    </Button>
                    <Button
                      color="secondary"
                      onClick={async () => {
                        await deleteDocument(doc.id);
                        loadDocuments();
                      }}
                      mini
                    >
                      Delete
                    </Button>
                  </td>
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
  uploadDocument: PropTypes.func.isRequired,
  downloadDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    uploadedDocuments: state.healthRecords.uploadedDocuments,
    isUploadingDocument: state.healthRecords.uploadDocument.isUploading,
    uploadDocumentStatus: state.healthRecords.uploadDocument.uploadStatus
  };
}

export default connect(
  mapStateToProps,
  { uploadDocument, loadDocuments, downloadDocument, deleteDocument }
)(UploadRecords);
