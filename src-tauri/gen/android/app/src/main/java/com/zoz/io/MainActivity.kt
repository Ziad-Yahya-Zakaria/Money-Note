package com.zoz.io

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity : TauriActivity() {
  private val cameraPermissionRequestCode = 1001

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    ensureCameraPermission()
  }

  private fun ensureCameraPermission() {
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) ==
      PackageManager.PERMISSION_GRANTED
    ) {
      return
    }

    ActivityCompat.requestPermissions(
      this,
      arrayOf(Manifest.permission.CAMERA),
      cameraPermissionRequestCode
    )
  }
}
