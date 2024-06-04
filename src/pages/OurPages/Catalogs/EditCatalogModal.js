import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useDispatch } from 'react-redux';
import { EditCatalogData } from '../../../slices/thunks';

registerPlugin(FilePondPluginImagePreview);

const EditCatalogModal = ({ EditCatalogModal = false, toggleCatalogEdit = () => { }, data }) => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [catalogData, setCatalogData] = useState({
        catalogId: '',
        name: '',
        full_details: '',
        media_id: ''
    });

    useEffect(() => {
        if (data && data.success) {
            setCatalogData({
                catalogId: data.data._id || '',
                name: data.data.title || '',
                full_details: data.data.fullDetails || '',
                media_id: data.data.mediaID || ''
            });
            if (data.data.mediaUrls && data.data.mediaUrls.length > 0) {
                setFiles(data.data.mediaUrls.map(url => ({
                    source: url,
                    options: { type: 'local' }
                })));
            }
        }
    }, [data]);

    const handleInputChange = ({ target: { id, value } }) => {
        setCatalogData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSaveChanges = () => {
        dispatch(EditCatalogData(catalogData));
        toggleCatalogEdit(false);
    };

    const loadHandler = (source, load, error, progress, abort, headers) => {
        fetch(new Request(source))
            .then(response => response.blob())
            .then(load)
            .catch(err => {
                console.error("Image loading failed: ", err);
                abort();
            });
    };

    const processHandler = (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        const authData = JSON.parse(localStorage.getItem("authUser"));
        const formData = new FormData();
        formData.append("upload", file, file.name);

        fetch('https://seahorse-app-yobkt.ondigitalocean.app/admin/media/single', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: authData.token,
            },
        })
            .then(response => response.json())
            .then(response => {
                setCatalogData(prevState => ({
                    ...prevState,
                    media_id: response._id
                }));
                load(response.fileId);
            })
            .catch(err => {
                console.error('Upload failed:', err);
                error('Upload failed');
            });

        return {
            abort: () => abort(),
        };
    };

    return (
        <Modal
            size="xl"
            isOpen={EditCatalogModal}
            toggle={() => toggleCatalogEdit(false)}
            className="modal-fullscreen"
            id="exampleModalFullscreen"
        >
            <ModalHeader
                className="modal-title"
                id="exampleModalFullscreenLabel"
                toggle={() => toggleCatalogEdit(false)}
            >
                Edit Catalog
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="name">Catalog Title*</Label>
                            <Input
                                type="text"
                                id="name"
                                value={catalogData.name}
                                onChange={handleInputChange}
                                placeholder="Enter catalog title"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="full_details">Description*</Label>
                            <Input
                                type="textarea"
                                id="full_details"
                                value={catalogData.full_details}
                                onChange={handleInputChange}
                                placeholder="Enter full details"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="productImages">Add Catalog Images</Label>
                            <div className="filepond-wrapper">
                                <FilePond
                                    files={files}
                                    onupdatefiles={setFiles}
                                    server={{
                                        load: loadHandler,
                                        process: processHandler,
                                    }}
                                    name="files"
                                    className="filepond filepond-input-multiple"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                />
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <div className="modal-footer">
                <Link
                    to="#"
                    onClick={() => toggleCatalogEdit(false)}
                    className="btn btn-link link-success fw-medium"
                >
                    <i className="ri-close-line me-1 align-middle" />
                    Close
                </Link>
                <Button color="primary" className="btn btn-primary" onClick={handleSaveChanges}>
                    Save changes
                </Button>
            </div>
        </Modal>
    );
};

export default EditCatalogModal;
