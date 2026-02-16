'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react'

export default function CSVImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<{ success: number; errors: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please select a CSV file')
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResult(data)
      setFile(null)

      // Reset file input
      const fileInput = document.getElementById('csv-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CSV Import Tool</h1>
        <p className="text-muted-foreground">
          Bulk import DMC companies from CSV files
        </p>
      </div>

      {/* Instructions */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          CSV Format Requirements
        </h2>
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Your CSV file should have the following columns (header row required):
          </p>
          <div className="bg-muted/50 p-4 rounded-md font-mono text-xs overflow-x-auto">
            <div>name, description, state, city, phone, email, website_url, address,</div>
            <div>service_categories, destination_expertise, established_year, certifications</div>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-muted-foreground ml-2">
            <li><strong>Required:</strong> name, state</li>
            <li><strong>Arrays (comma-separated):</strong> service_categories, destination_expertise, certifications</li>
            <li><strong>Year (numeric):</strong> established_year</li>
            <li><strong>Auto-generated:</strong> slug (from name), created_at, is_published (true by default)</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm font-medium text-blue-900 mb-2">💡 Example CSV Row:</p>
          <div className="bg-white p-3 rounded font-mono text-xs overflow-x-auto">
            <div>ABC Travel & Events,Professional DMC services in KL,Kuala Lumpur,Kuala Lumpur,</div>
            <div>+60123456789,info@abctravel.com,https://abctravel.com,123 Jalan Bukit Bintang,</div>
            <div>"Corporate Retreats,MICE","Kuala Lumpur,Langkawi",2010,"ISO 9001,MATTA"</div>
          </div>
        </div>
      </Card>

      {/* Download Template */}
      <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
        <div className="flex items-start gap-4">
          <Download className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Download CSV Template</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start with our template to ensure your CSV has the correct format and column headers.
            </p>
            <Button asChild variant="outline" size="sm">
              <a href="/templates/dmcmy-import-template.csv" download>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </a>
            </Button>
          </div>
        </div>
      </Card>

      {/* Upload Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload CSV File
        </h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="csv-file">Select CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isUploading}
              className="mt-2"
            />
          </div>

          {file && (
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm">
                <strong>Selected:</strong> {file.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 text-green-900 px-4 py-3 rounded-md">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Import Successful!</p>
                  <p className="text-sm mt-1">
                    Successfully imported <strong>{result.success}</strong> companies.
                  </p>
                </div>
              </div>
              {result.errors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-sm font-medium mb-2">Errors ({result.errors.length}):</p>
                  <ul className="text-xs space-y-1 max-h-40 overflow-y-auto">
                    {result.errors.map((err, i) => (
                      <li key={i} className="text-orange-700">• {err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full"
            size="lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading and Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload and Import
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 mt-6 bg-muted/30">
        <h3 className="font-semibold mb-3">Import Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Companies will be created with <strong>is_published = true</strong> by default</li>
          <li>• Slugs are auto-generated from company names (lowercase, hyphenated)</li>
          <li>• Duplicate slugs will be suffixed with a number</li>
          <li>• Service categories and destinations must match the predefined lists in config</li>
          <li>• Review imported companies in the Companies page before they go live</li>
          <li>• You can re-upload to update existing companies (matched by name)</li>
        </ul>
      </Card>
    </div>
  )
}
