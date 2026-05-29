import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { PlusCircle, Trash2, Layers } from 'lucide-react';
import { ShieldOutlined } from '@mui/icons-material';
import api from '../../api/api';
import { toast } from "react-toastify";
import './CreateFramework.css';

const CreateFramework = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    description: '',
    version: '1.0',
    authority: '',
    country: '',
    appliesTo: [],
    industry: '',
    controls: [
      { controlId: '', title: '', requirementText: '', mandatory: true, riskLevel: 'medium', tags: '' }
    ]
  });


  const [loading, setLoading] = useState(false);
  
  //  DYNAMIC FIXED POSITION ENGINE (JS BASED STICKY FALLBACK)
  const leftPanelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!leftPanelRef.current || !containerRef.current) return;
      
      const containerTop = containerRef.current.getBoundingClientRect().top;
      
      // Jab screen top row se niche scroll ho jaye
      if (containerTop < 24) {
        // Calculate dynamic width to match responsiveness
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = (containerWidth * 0.4) - 12; // 40% width allocation approx
        
        leftPanelRef.current.style.position = 'fixed';
        leftPanelRef.current.style.top = '24px';
        leftPanelRef.current.style.width = `${targetWidth}px`;
        leftPanelRef.current.style.maxWidth = '400px';
      } else {
        // Reset back to absolute original position
        leftPanelRef.current.style.position = 'relative';
        leftPanelRef.current.style.top = '0px';
        leftPanelRef.current.style.width = '100%';
        leftPanelRef.current.style.maxWidth = '400px';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Responsive handling
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedAppliesTo = [...formData.appliesTo];
    if (checked) {
      updatedAppliesTo.push(value);
    } else {
      updatedAppliesTo = updatedAppliesTo.filter((item) => item !== value);
    }
    setFormData({ ...formData, appliesTo: updatedAppliesTo });
  };

  const handleControlChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedControls = [...formData.controls];
    updatedControls[index][name] = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, controls: updatedControls });
  };

  const addControlField = () => {
    setFormData({
      ...formData,
      controls: [...formData.controls, { controlId: '', title: '', requirementText: '', mandatory: true, riskLevel: 'medium', tags: '' }]
    });
  };

  const removeControlField = (index) => {
    const updatedControls = formData.controls.filter((_, i) => i !== index);
    setFormData({ ...formData, controls: updatedControls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedControls = formData.controls.map(control => ({
      controlId: control.controlId || "CTRL-" + Math.floor(Math.random() * 1000),
      title: control.title || "Untitled Requirement Block",
      description: `Regulatory framework ruleset mapped for ${control.title || 'this operational unit'}.`,
      requirementText: control.requirementText || "Standard compliance audit parameters apply.",
      mandatory: control.mandatory,
      riskLevel: control.riskLevel || 'medium',
      tags: control.tags ? control.tags.split(',').map(tag => tag.trim()) : []
    }));

    const dataToSend = {
      name: formData.name || "Unnamed Compliance Matrix",
      shortCode: formData.shortCode.toUpperCase() || "FW-TEMP",
      description: formData.description || "No strategic overview text assigned.",
      version: formData.version || "1.0",
      authority: formData.authority || "Global Compliance Body",
      country: formData.country || "Global",
      appliesTo: formData.appliesTo.length > 0 ? formData.appliesTo : ["company"],
      industry: formData.industry || "General Enterprise",
      controls: formattedControls
    };

    try {
      const response = await api.post(
        '/framework/create', 
        dataToSend,
        { withCredentials: true }
      );

      if (response.data) {
        toast.success('Framework with Controls Created Successfully! 🎉');
        if (setActiveTab) setActiveTab('view');
      }
    } catch (error) {
      console.error("Backend Error:", error);
      alert(error.response?.data?.message || 'Something went wrong while saving framework');
    } finally {
      setLoading(false);
    }
  };

  const muiInputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#1e293b', borderRadius: '10px' },
      '&:hover fieldset': { borderColor: '#3b82f6' },
      '&.Mui-focused fieldset': { borderColor: '#6366f1' },
      '& .MuiSelect-select': { color: '#fff' }
    }
  };

  return (
    <div className="create-wrapper">
      <form onSubmit={handleSubmit}>
        
        {/* HEADER */}
        <div className="create-header-row">
          <div className="create-header-icon"><Layers size={24} /></div>
          <div>
            <h2 className="create-header-title">Configure Compliance Framework</h2>
            <p className="create-header-subtitle">Define policies, dynamic criteria structures, and structural mandatory rules.</p>
          </div>
        </div>

        {/* LAYOUT STRUCTURE wrapper connected to dynamic layout handler */}
        <div className="create-layout-grid" ref={containerRef}>
          
          {/*  LEFT FIXED CONFIG PANEL (Connected via Ref for Absolute Positioning) */}
          <div className="left-config-panel" ref={leftPanelRef}>
            <div className="panel-section-title"> Framework Parameters</div>
            
            <div className="input-stack">
              <TextField label="Framework Name *" name="name" onChange={handleChange} required fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} />
              <TextField label="Short Code (Unique) *" name="shortCode" onChange={handleChange} required fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff', textTransform: 'uppercase' } }} sx={muiInputStyles} />
              
              <div className="input-row-twin">
                <TextField label="Version" name="version" value={formData.version} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} />
                <TextField label="Industry" name="industry" onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} placeholder="e.g., Tech" />
              </div>

              <TextField label="Authority / Body" name="authority" onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} placeholder="e.g., ISO Council" />
              <TextField label="Country" name="country" onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} placeholder="e.g., Global" />

              <div>
                <div className="scope-title">Applies To Target Scope</div>
                <FormControlLabel control={<Checkbox value="company" checked={formData.appliesTo.includes("company")} onChange={handleCheckboxChange} sx={{ color: '#1e293b', '&.Mui-checked': { color: '#6366f1' } }} />} label="Company" sx={{ color: '#cbd5e1', '& .MuiTypography-root': { fontSize: '14px' } }} />
                <FormControlLabel control={<Checkbox value="product" checked={formData.appliesTo.includes("product")} onChange={handleCheckboxChange} sx={{ color: '#1e293b', '&.Mui-checked': { color: '#6366f1' } }} />} label="Product" sx={{ color: '#cbd5e1', '& .MuiTypography-root': { fontSize: '14px' } }} />
              </div>

              <TextField label="Framework Description" name="description" onChange={handleChange} multiline rows={3} fullWidth InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} placeholder="Brief summary notes..." />
            </div>
          </div>

          {/*  RIGHT PANEL */}
          <div className="right-requirements-panel" style={{ marginLeft: 'auto' }}>
            <div className="requirements-header-bar">
              <div className="requirements-title"><ShieldOutlined sx={{ fontSize: 20 }} /> Audit Requirements ({formData.controls.length})</div>
              <Button variant="outlined" color="success" startIcon={<PlusCircle size={16} />} onClick={addControlField} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}>Add Rule Box</Button>
            </div>

            <div className="rules-stack">
              {formData.controls.map((control, index) => (
                <div className="rule-box-card" key={index}>
                  {formData.controls.length > 1 && (
                    <button type="button" className="rule-delete-btn" onClick={() => removeControlField(index)}><Trash2 size={16} /></button>
                  )}

                  <div className="inputs-inner-grid">
                    <TextField label="Control ID *" name="controlId" value={control.controlId} onChange={(e) => handleControlChange(index, e)} required fullWidth size="small" InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} />
                    <TextField label="Control Title *" name="title" value={control.title} onChange={(e) => handleControlChange(index, e)} required fullWidth size="small" InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} />
                    <TextField select label="Risk Level" name="riskLevel" value={control.riskLevel} onChange={(e) => handleControlChange(index, e)} fullWidth size="small" InputLabelProps={{ style: { color: '#64748b' } }} sx={muiInputStyles}>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </TextField>

                    <div className="span-full-row">
                      <TextField label="Requirement Text *" name="requirementText" value={control.requirementText} onChange={(e) => handleControlChange(index, e)} required fullWidth size="small" InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} />
                    </div>

                    <div className="span-two-columns">
                      <TextField label="Tags (Comma Separated)" name="tags" value={control.tags} onChange={(e) => handleControlChange(index, e)} fullWidth size="small" InputLabelProps={{ style: { color: '#64748b' } }} inputProps={{ style: { color: '#fff' } }} sx={muiInputStyles} placeholder="e.g., cyber, privacy" />
                    </div>
                    
                    <div className="mandatory-flex-field">
                      <FormControlLabel control={<input type="checkbox" name="mandatory" checked={control.mandatory} onChange={(e) => handleControlChange(index, e)} style={{ accentColor: '#10b981', transform: 'scale(1.2)', marginRight: '8px', cursor: 'pointer' }} />} label="Is Mandatory?" sx={{ color: '#cbd5e1', '& .MuiTypography-root': { fontSize: '14px' } }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Divider sx={{ bgcolor: '#1e293b', my: 4 }} />
            <button type="submit" className="submit-action-btn" disabled={loading}>{loading ? 'Publishing Framework...' : ' Publish Framework to Users'}</button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default CreateFramework;